import { useCallback, useEffect, useMemo } from 'react'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useBoundStore } from '../stores/BoundStore'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Drawer,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
  styled
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))
const Details = () => {
  const {
    show,
    game,
    setShow,
    toggleFavoriteGame,
    favoriteGames,
    runExecutable,
    running,
    setRunning,
    token,
    member,
    center_id
  } = useBoundStore((state) => ({
    show: state.show,
    game: state.game,
    setShow: state.setShow,
    toggleFavoriteGame: state.toggleFavoriteGame,
    favoriteGames: state.favoriteGames,
    runExecutable: state.runExecutable,
    messages: state.messages,
    alert: state.alert,
    running: state.running,
    setRunning: state.setRunning,
    token: state.token,
    member: state.member,
    center_id: state.center_id
  }))

  const isFavorited = useMemo(
    () => favoriteGames && favoriteGames?.some((favoriteGame) => favoriteGame.id == game.id)
  )

  const handleClose = useCallback(() => {
    setShow(false)
  }, [setShow])

  const handleFavorite = useCallback(async () => {
    toggleFavoriteGame(center_id, member.id, game.id, token)
  }, [game, toggleFavoriteGame])

  useEffect(() => {
    const handleGameProcessStarted = (_, data) => {
      console.log('Game process started:', data)
      setRunning(game.id)
    }

    const handleGameProcessExited = (_, data) => {
      console.log('Game process exited:', data)
      setRunning('')
    }

    window.electron.ipcRenderer.on('game-process-started', handleGameProcessStarted)
    window.electron.ipcRenderer.on('game-process-exited', handleGameProcessExited)

    return () => {
      window.electron.ipcRenderer.removeListener('game-process-started', handleGameProcessStarted)
      window.electron.ipcRenderer.removeListener('game-process-exited', handleGameProcessExited)
    }
  }, [running])

  return (
    <>
      <Drawer
        anchor={'right'}
        open={show}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: `url(${game?.videos == null ? game?.screenshots[2] : ''})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{ width: '100vw', height: '100vh', overflow: 'auto', position: 'relative' }}
          className="no-scrollbar"
        >
          <Box
            display={'grid'}
            gridTemplateColumns={'320px 3fr'}
            gap={5}
            margin="1rem"
            position={'relative'}
            className="no-scrollbar"
            sx={{ overflow: 'auto', flex: 1 }}
          >
            <Box>
              <Card
                sx={{
                  backgroundImage: `url(${game?.poster})`,
                  backgroundColor: '#ccc',
                  width: '320px',
                  height: 'auto',
                  aspectRatio: '3 / 4',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  borderRadius: '1rem',
                  position: 'relative'
                }}
              >
                <IconButton
                  variant="outlined"
                  color={isFavorited ? 'error' : 'success'}
                  sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                  onClick={() => handleFavorite()}
                >
                  {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Card>

              <LoadingButton
                loading={running === game.id}
                loadingIndicator="Running..."
                variant="contained"
                color="success"
                size="large"
                fullWidth
                startIcon={<PlayArrowIcon />}
                onClick={() => runExecutable()}
                sx={{ my: 2 }}
              >
                Play {game.name}
              </LoadingButton>
              {game?.game_accounts?.length > 0 && (
                <LoadingButton
                  loading={running === game.id}
                  loadingIndicator="Running..."
                  role={'button'}
                  variant="contained"
                  color="info"
                  size="large"
                  fullWidth
                  startIcon={<PlayArrowIcon />}
                  onClick={() => runExecutable()}
                >
                  Play with center account
                </LoadingButton>
              )}
            </Box>
            <Box>
              <Card sx={{ mb: 2, height: 'auto' }}>
                <CardHeader
                  title={game?.name}
                  subheader={game?.game_type}
                  sx={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}
                />
                <CardContent>
                  <Typography variant="h6">Summary</Typography>
                  <Typography variant="body1">{game?.summary}</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardHeader title="Screenshots" sx={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }} />
                <CardContent>
                  <ImageList
                    sx={{ width: '100%', height: '500px', overflow: 'auto', position: 'relative', margin:0 }}
                    cols={2}
                    rowHeight={160}
                    className="no-scrollbar"
                  >
                    {game?.screenshots?.map((item) => (
                      <ImageListItem key={item}>
                        <img src={item} alt={game?.name} loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Drawer>
      {/* <Offcanvas
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
              
              <div
                className="cover position-relative"
                style={{ backgroundImage: `url(${game?.poster})`, backgroundColor: '#ccc' }}
              >
                <button variant="outline-danger" className="position-absolute top-0 end-0 m-3">
                  <i
                    className={isFavorited ? 'bi bi-heart-fill' : 'bi bi-heart'}
                    style={{ fontSize: '2rem' }}
                    onClick={() => handleFavorite()}
                  ></i>
                </button>
              </div>
              <button
                variant={running === game.id ? 'secondary' : 'success'}
                className="p-0 fs-2 d-flex justify-content-center align-items-center"
                id="play-button"
                onClick={() => runExecutable()}
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
              </button>
              {game?.game_accounts?.length > 0 ? (
                <button
                  variant="secondary"
                  className="p-0 fs-5 d-flex justify-content-center align-items-center"
                  id="play-button"
                  onClick={() => runExecutable()}
                >
                  <i className="bi bi-play-fill" style={{ fontSize: '2.5rem' }}></i> With Center
                  account
                </button>
              ) : (
                ''
              )}
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
    </Offcanvas> */}
    </>
  )
}

export default Details
