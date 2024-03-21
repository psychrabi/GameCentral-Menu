import { useState, useEffect } from 'react'

const getApiKey = async (clientId, clientSecret) => {
  if (getApiKey.cachedToken && getApiKey.cachedExpiry > Date.now()) {
    return getApiKey.cachedToken;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  });

  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!response.ok) {
    throw new Error(`Failed to get API key: ${response.statusText}`);
  }

  const data = await response.json();
  getApiKey.cachedToken = data.access_token;
  // Assuming the token expires in data.expires_in seconds, setting a buffer of 1 minute (60000 ms) before expiration
  getApiKey.cachedExpiry = Date.now() + (data.expires_in - 60) * 1000;

  return data.access_token;
}

const GameDetail = (props) => {
  const [game, setGame] = useState({})
  const [cover, setCover] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [videos, setVideos] = useState([])
  const [summary, setSummary] = useState(null)

  const fetchData = async () => {
    const apiKey = await getApiKey(
      'sz4fdut3dwthuoryprilvj8ce5fvg8',
      'l56dya21c4u40vkjnvrvol1rttxfj3'
    )

    const response = await fetch(`https://api-v3.igdb.com/games/?search=${game}`, {
      headers: {
        Accept: 'application/json',
        'user-key': apiKey
      }
    })

    const games = await response.json()

    if (games && games.length) {
      fetch(
        `https://api.igdb.com/v4/games/${games[0].id}?fields=name,cover.*,screenshots.*,videos.*,summary`,
        {
          headers: {
            Accept: 'application/json',
            'user-key': apiKey
          }
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setGame(data[0])
          setCover(data[0].cover.url)
          setScreenshots(data[0].screenshots)
          setVideos(data[0].videos)
          setSummary(data[0].summary)
        })
        .catch((error) => console.error(error))
    }
  }

  return (
    <div>
      <h1>{game.name}</h1>
      {cover && <img src={`https:${cover.replace('t_thumb', 't_cover_big')}`} alt={game.name} />}
      {summary && <p>{summary}</p>}
      <h2>Screenshots:</h2>
      <div>
        {screenshots.map((screenshot) => (
          <img
            src={`https:${screenshot.url.replace('t_thumb', 't_screenshot_big')}`}
            key={screenshot.id}
            alt={`${game.name} screenshot`}
          />
        ))}
      </div>
      <h2>Videos:</h2>
      <div>
        {videos.map((video) => (
          <video src={`https:${video.video_id}`} key={video.id} controls />
        ))}
      </div>
    </div>
  )
}

export default GameDetail
