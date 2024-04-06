import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useBoundStore } from '../stores/BoundStore'
import "./Grid.scss"

const Grid = React.memo(({ games, getData }) => {
const { setCount, setMessages, setAlert, runExecutable } = useBoundStore(state => ({
    setCount: state.setCount,
    setMessages: state.setMessages,
    setAlert: state.setAlert,
    runExecutable: state.runExecutable
  }));

  useEffect(() => {
    // Update the count whenever games change
    setCount(games?.length)
  }, [games])

  // const handleSelect = useCallback((id) => {
  //   getData(id)
  //   setShow(true)

  // }, [getData, setShow])

  useEffect(() => {
    const handleGameProcessStarted = (_, data) => {
      console.log('Game process started:', data);
      // setRunning(game.id);
    };

    const handleGameProcessExited = (_, data) => {
      console.log('Game process exited:', data);
      setMessages('Game process exited')
      setAlert('info')
    };

    window.electron.ipcRenderer.on('game-process-started', handleGameProcessStarted);
    window.electron.ipcRenderer.on('game-process-exited', handleGameProcessExited);

    return () => {
      window.electron.ipcRenderer.removeListener('game-process-started', handleGameProcessStarted);
      window.electron.ipcRenderer.removeListener('game-process-exited', handleGameProcessExited);
    };
  }, []);

  return (
    <>
      <div className="grid" id="favorite-games-container">
        {games?.map((game) => (

          <div key={game.id} className="card game shadow-sm">
            <LazyLoadImage
              className="card-img"
              src={game.poster}
              alt={game.name}
              effect="blur"
              style={{ objectFit: 'cover', aspectRatio: '3 / 4' }}
            />
            <div className="overlay">
              <div className="btn-group d-flexflex-row">
                <div className="btn-group w-50" role="group"
                  aria-label="Play button">
                  <button type="button" className={'btn btn-sm btn-success'} title='Play with own account' onClick={() => runExecutable(game.executable, game.parameters)}>
                    <i className="bi bi-play-fill"></i> Play
                  </button>
                </div>
                {game?.game_accounts?.length > 0 && (
                  <div className="btn-group w-50" role="group"
                    aria-label="Play with center account button">
                    <button type="button" className="btn btn-sm btn-primary" title='Play with center account' >
                      <i className="bi bi-play-fill"></i> Play
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>


        ))}
      </div>
    </>
  )
})

Grid.propTypes = {
  games: PropTypes.array,
  handleShow: PropTypes.func,
  getData: PropTypes.func
}

export default Grid
