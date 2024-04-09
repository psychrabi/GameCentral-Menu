import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { useBoundStore } from '../../stores/BoundStore'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ShareIcon from '@mui/icons-material/Share'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Grid as LayoutGrid,
  Typography
} from '@mui/material'
import './Grid.scss'

const Grid = React.memo(({ games, getData }) => {
  const { setCount, setMessages, setAlert, runExecutable, setShow } = useBoundStore((state) => ({
    setCount: state.setCount,
    setMessages: state.setMessages,
    setAlert: state.setAlert,
    runExecutable: state.runExecutable,
    setShow: state.setShow
  }))

  useEffect(() => {
    // Update the count whenever games change
    setCount(games?.length)
  }, [games])

  const handleSelect = useCallback(
    (id) => {
      getData(id)
      setShow(true)
    },
    [getData, setShow]
  )

  // useEffect(() => {
  //   const handleGameProcessStarted = (_, data) => {
  //     console.log('Game process started:', data);
  //     // setRunning(game.id);
  //   };

  //   const handleGameProcessExited = (_, data) => {
  //     console.log('Game process exited:', data);
  //     setMessages('Game process exited')
  //     setAlert('info')
  //   };

  //   window.electron.ipcRenderer.on('game-process-started', handleGameProcessStarted);
  //   window.electron.ipcRenderer.on('game-process-exited', handleGameProcessExited);

  //   return () => {
  //     window.electron.ipcRenderer.removeListener('game-process-started', handleGameProcessStarted);
  //     window.electron.ipcRenderer.removeListener('game-process-exited', handleGameProcessExited);
  //   };
  // }, []);

  return (
    <>
      <Box className="grid" px={2}>
        {games?.map((game) => (
          <Card key={game.id} className="card game shadow-sm">
            <CardMedia
              effect="blur"
              image={game.poster}
              title={game.name}
              sx={{ objectFit: 'cover', aspectRatio: '3 / 4' }}
              width={'100%'}
              height={'auto'}
            />
            <Card
              onClick={() => handleSelect(game.id)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <CardContent>
                <Typography variant="h6" textOverflow={'ellipsis'}>
                  {game.name}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => runExecutable(game.executable)}
                  variant="filled"
                  color="success"
                  size='large'
                >
                  <PlayArrowIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Card>
        ))}
      </Box>
    </>
  )
})

Grid.propTypes = {
  games: PropTypes.array,
  handleShow: PropTypes.func,
  getData: PropTypes.func
}

export default Grid
