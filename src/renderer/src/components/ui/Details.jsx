import Offcanvas from 'react-bootstrap/Offcanvas'
import Carousel from 'react-bootstrap/Carousel'
import { useCallback, useState } from 'react'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage.js'
import axiosClient from '../../lib/axios-client.js'
import { useDataStore } from '../stores/DataStore.js'
import { useAuthStore } from '../stores/AuthStore.js'

const Details = () => {
  const { show, game, setShow, setNotification, setError } = useDataStore()
  const [running, setRunning] = useState(false)
  const { member, token } = useAuthStore()

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  const handleFavoriteClick = useCallback((game_id) => {
    const payload = {
      center_id: member.center_id,
      member_id: member.id,
      game_id: game_id
    }

    axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const favorite_games = JSON.parse(localStorage.getItem('favorite_games'))

    axiosClient
      .post('/favoriteGame', payload)
      .then((response) => {
        // console.log(response.status)
        if (response.status === 204) {
          setNotification(game.name + ' : removed from favorites')
          localStorage.setItem(
            'favorite_games',
            JSON.stringify(favorite_games.filter((g) => g.id !== game.id))
          )
        } else {
          setNotification(game.name + ' : added to favorites')
          localStorage.setItem('favorite_games', JSON.stringify([...favorite_games, game]))
        }
        setShow(false)
      })
      .catch((error) => {
        console.log(error.message)
        setError('Favorite game status couldnot be changed for ' + game.name)
      })
  }, [])

  const handleGamePlay = useCallback((filePath) => {
    window.api.checkExecutable(filePath).then((response) => {
      if (response.status === 'file-exists') {
        window.api.launchExecutable(filePath).then((response) => setRunning(response))
      } else {
        setRunning(false)
        setError('Game executable missing')
      }
      // console.log('game lauched')
    })
  }, [])

  // useEffect(() => {
    //   window.api.executableExited()
  // }, [])

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      onExited={() => removeFromLocalStorage('current-selected')}
    >
      <div
        style={{
          background: `url(${game?.videos == null ? game?.screenshots[2] : ''})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className="h-100"
      >
        {/* {game?.videos && <video
          className="video"
          autoPlay
          muted
          playsInline
          loop

        >
          <source type="video/mp4" src={'src/public/videos/video-1.mp4'} id="url-video" />
        </video>} */}

        {/* <video autoPlay muted loop id="myVideo">
          <source src="../../public/videos/video-1.mp4" type="video/mp4" />
        </video> */}
        <Offcanvas.Header closeButton closeVariant={'white'}>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="no-scrollbar text-light">
          <div className="top mx-5">
            <div className="d-grid gap-3">
              <div
                className="cover position-relative"
                style={{ backgroundImage: `url(${game?.poster})`, backgroundColor: '#ccc' }}
              >
                <button className="btn btn-outline-danger position-absolute top-0 end-0 m-3">
                  <i
                    className={game?.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
                    style={{ fontSize: '2rem' }}
                    onClick={() => handleFavoriteClick(game.id)}
                  ></i>
                </button>
              </div>
              <button
                className="btn btn-primary p-0 fs-2 d-flex justify-content-center align-items-center"
                id="play-button"
                onClick={() => handleGamePlay(game.executable, game.parameters)}
              >
                {running ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Running
                  </>
                ) : (
                  <>
                    <i className="bi bi-play-fill" style={{ fontSize: '2.5rem' }}></i> Play
                  </>
                )}
              </button>
              <button
                className="btn btn-secondary p-0 fs-4 d-flex justify-content-center align-items-center"
                id="play-button"
                onClick={() => handleGamePlay(game.executable, game.parameters)}
              >
                <i className="bi bi-play-fill" style={{ fontSize: '2.5rem' }}></i> With Center
                account
              </button>
            </div>
            <div className="ms-5">
              <div className="d-flex flex-column justify-content-between">
                <div className="fs-1 d-flex align-items-center">
                  {game?.name}
                  <span className="badge bg-info fs-4 ms-3" id="playtime">
                    {game?.game_type}
                  </span>
                </div>

                <div className="item pt-2 mb-0">
                  <h4 className="h4">Summary</h4>
                  <p>{game?.summary}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-600 mx-5 my-5">
            <h4 className="h4">Screenshots</h4>
            <div className="screenshots w-25">
              <Carousel indicators={false}>
                {game?.screenshots.map((screenshot, i) => (
                  <Carousel.Item key={i}>
                    <img className="d-block w-100" src={screenshot} alt={game?.name} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </Offcanvas.Body>
      </div>
    </Offcanvas>
  )
}

export default Details
