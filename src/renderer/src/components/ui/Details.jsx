import Offcanvas from 'react-bootstrap/Offcanvas'
import Carousel from 'react-bootstrap/Carousel'
import { useCallback, useEffect, useState } from 'react'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage.js'
import { useStateContext } from '../contexts/ContextProvider.jsx'
import axiosClient from '../../lib/axios-client.js'
import { useGamesStore } from '../stores/GamesStore.js'

const Details = () => {
  const { setNotifications } = useStateContext()
  const show = useGamesStore((state) => state.show)
  const game = useGamesStore((state) => state.game)
  const setShow = useGamesStore((state) => state.setShow)
  const [running, setRunning] = useState(false)

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  const handleFavoriteClick = useCallback((game_id) => {
    const member = JSON.parse(localStorage.getItem('member'))
    const payload = {
      center_id: member.center_id,
      member_id: member.id,
      game_id: game_id
    }

    axiosClient.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
    const favorite_games = JSON.parse(localStorage.getItem('favorite_games'))

    axiosClient
      .post('/favoriteGames', payload)
      .then((response) => {
        console.log(response.status)
        if (response.status === 204) {
          setNotifications(game.name + ' : removed from favorites')
          localStorage.setItem(
            'favorite_games',
            JSON.stringify(favorite_games.filter((g) => g.id !== game.id))
          )
        } else {
          setNotifications(game.name + ' : added to favorites')
          localStorage.setItem('favorite_games', JSON.stringify([...favorite_games, game]))
        }
        setShow(false)
      })
      .catch((error) => {
        console.log(error.message)
        setNotifications('Favorite game status couldnot be changed for ' + game.name)
      })
  }, [])

  const handleGamePlay = useCallback((filePath) => {
    window.api.checkExecutable(filePath).then((response) => {
      if (response.status === 'file-exists') {
        window.api.launchExecutable(filePath).then((response) => setRunning(response))
      } else {
        setRunning(false)
        setNotifications('Game executable missing')
      }
    })
  }, [])

  // useEffect(() => {
  //   window.api.executableExited()
  // }, [])

  return (
    <div className="position-relative">
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        onExited={() => removeFromLocalStorage('current-selected')}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{game.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="no-scrollbar">
          <div className="top">
            <div
              className="cover position-relative"
              style={{ backgroundImage: `url(${game.poster})` }}
            ></div>
            <div className="ms-2 pt-1" style={{ height: '100%' }}>
              <div
                className="d-flex flex-column justify-content-between"
                style={{ height: '100%' }}
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Game type</span>
                    <span className="" id="playtime">
                      {game.game_type}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <button
                    className="d-flex btn btn-success me-auto align-items-center"
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
                        <i className="bi bi-play"></i> Play
                      </>
                    )}
                  </button>
                  {/* <button
                    className="d-flex btn btn-success me-auto align-items-center"
                    id="play-button"
                    onClick={() => handleGamePlay(game.executable, game.parameters)}
                  >
                    <i className="bi bi-play"></i> Play{' '}
                  </button> */}
                  <button className="btn btn-outline-danger">
                    <i
                      className={game.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
                      onClick={() => handleFavoriteClick(game.id)}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="item bg-gray-600 pt-2 mb-0">
            <h4 className="h4">Summary</h4>
            <p>{game.summary}</p>
          </div>
          <div className="item bg-gray-600 p-2 mb-3">
            <h4 className="h4">Screenshots</h4>
            <div className="screenshots">
              <Carousel indicators={false}>
                {game.screenshots.map((screenshot, i) => (
                  <Carousel.Item key={i}>
                    <img className="d-block w-100" src={screenshot} alt={game.name} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Details
