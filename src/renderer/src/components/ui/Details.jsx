import { useCallback, useContext, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage.js'
// import axiosClient from '../../lib/axios-client.js'
import { Button } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import notificationContext from '../../context/NotificationContext.js'
import { useBoundStore } from '../stores/BoundStore.js'
const Details = () => {
  const {
    show,
    game,
    setShow,
    toggleFavoriteGame,
    runExecutable,
    running,
    setRunning,
    token,
    member,
    center_id,
  } = useBoundStore((state) => ({
    show: state.show,
    game: state.game,
    setShow: state.setShow,
    toggleFavoriteGame: state.toggleFavoriteGame,
    runExecutable: state.runExecutable,
    messages: state.messages,
    alert: state.alert,
    running: state.running,
    setRunning: state.setRunning,
    token: state.token,
    member: state.member,
    center_id: state.center_id,
  }))

  const { showAlert } = useContext(notificationContext)
  const handleClose = useCallback(() => {
    setShow(false)
  }, [setShow])

  useEffect(() => {
    const handleGameProcessStarted = (_, data) => {
      console.log('Game process started:', data);
      setRunning(game.id);
    };

    const handleGameProcessExited = (_, data) => {
      console.log('Game process exited:', data);
      setRunning('');
    };

    window.electron.ipcRenderer.on('game-process-started', handleGameProcessStarted);
    window.electron.ipcRenderer.on('game-process-exited', handleGameProcessExited);

    return () => {
      window.electron.ipcRenderer.removeListener('game-process-started', handleGameProcessStarted);
      window.electron.ipcRenderer.removeListener('game-process-exited', handleGameProcessExited);
    };
  }, [running]);

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
        className="h-100 overflow-y-auto no-scrollbar"
      >
        <Offcanvas.Header closeButton closeVariant={'white'}>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="text-light d-flex flex-column">
          <div className="top mx-5 sticky">
            <div className="d-grid gap-3 ">
              {/* Poster div */}
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
                variant={running === game.id ? 'secondary' : 'success'}
                className="p-0 fs-2 d-flex justify-content-center align-items-center"
                id="play-button"
                onClick={runExecutable}
                disabled={running === game.id}
              >
                {running == game.id ? (
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
              {game?.game_accounts?.length > 0 ? (
                <Button
                  variant="secondary"
                  className="p-0 fs-5 d-flex justify-content-center align-items-center"
                  id="play-button"
                  onClick={() => runExecutable()}
                >
                  <i className="bi bi-play-fill" style={{ fontSize: '2.5rem' }}></i> With Center
                  account
                </Button>
              ) : ''}

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
                    <LazyLoadImage className="d-block w-100" src={screenshot} alt={game?.name} />
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
