import Offcanvas from 'react-bootstrap/Offcanvas'
import Carousel from 'react-bootstrap/Carousel'
import { useCallback, useContext, useEffect, useState } from 'react'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage.js'
// import axiosClient from '../../lib/axios-client.js'
import { useDataStore } from '../stores/DataStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import notificationContext from '../../context/notificationContext.js'
import { Button } from 'react-bootstrap'

const Details = () => {
  const show = useDataStore((state) => state.show)
  const game = useDataStore((state) => state.game)
  const setShow = useDataStore((state) => state.setShow)
  const toggleFavoriteGame = useDataStore((state) => state.toggleFavoriteGame)
  const runExecutable = useDataStore((state) => state.runExecutable)
  const messages = useDataStore((state) => state.messages)
  const alert = useDataStore((state) => state.alert)

  const [running, setRunning] = useState(false)

  const token = useAuthStore((state) => state.token)
  const member = useAuthStore((state) => state.member)
  const center_id = useAuthStore((state) => state.center_id)

  const { showAlert } = useContext(notificationContext)
  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  // useEffect(() => {
  //   if (messages && alert) {
  //     showAlert(messages, alert)
  //   }
  // }, [messages, alert])

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      onExited={() => removeFromLocalStorage('current-selected')}
      keyboard="false"
      backdrop="static"
    >
      <div
        style={{
          background: `url(${game?.videos == null ? game?.screenshots[2] : ''})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className="h-100"
      >
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
                <Button variant="outline-danger" className="position-absolute top-0 end-0 m-3">
                  <i
                    className={game?.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
                    style={{ fontSize: '2rem' }}
                    onClick={() => toggleFavoriteGame(center_id, member.id, game.id, token)}
                  ></i>
                </Button>
              </div>
              <Button
                variant="primary"
                className="p-0 fs-2 d-flex justify-content-center align-items-center"
                id="play-button"
                onClick={() => runExecutable()}
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
              </Button>
              <Button
                variant="secondary"
                className="p-0 fs-5 d-flex justify-content-center align-items-center"
                id="play-button"
                onClick={() => runExecutable()}
              >
                <i className="bi bi-play-fill" style={{ fontSize: '2.5rem' }}></i> With Center
                account
              </Button>
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
