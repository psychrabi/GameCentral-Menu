import { useCallback, useEffect, useMemo } from 'react'
import { useBoundStore } from '../../../stores/BoundStore'
import CloseIcon from '@mui/icons-material/Close'
import { Screenshots } from '../Screenshots'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Drawer,
  IconButton,
  Typography,
  styled
} from '@mui/material'
import { PlayButton } from '../PlayButton'
import { FavoriteButton } from '../FavoriteButton'
import { Summary } from '../Summary'
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))
const Details = () => {
  const { show, game, setShow, favoriteGames } = useBoundStore((state) => ({
    show: state.show,
    game: state.game,
    setShow: state.setShow,
    toggleFavoriteGame: state.toggleFavoriteGame,
    favoriteGames: state.favoriteGames,
    runExecutable: state.runExecutable,
    messages: state.messages,
    alert: state.alert,
    running: state.running,
    setRunning: state.setRunning
  }))

  const isFavorited = useMemo(
    () => favoriteGames && favoriteGames?.some((favoriteGame) => favoriteGame.id == game.id)
  )

  const handleClose = () => {
    setShow(false)
  }

  //TODO: Change this to use Rust invoke function
  // useEffect(() => {
  //   const handleGameProcessStarted = (_, data) => {
  //     console.log('Game process started:', data)
  //     setRunning(game.id)
  //   }

  //   const handleGameProcessExited = (_, data) => {
  //     console.log('Game process exited:', data)
  //     setRunning('')
  //   }

  //   window.electron.ipcRenderer.on('game-process-started', handleGameProcessStarted)
  //   window.electron.ipcRenderer.on('game-process-exited', handleGameProcessExited)

  //   return () => {
  //     window.electron.ipcRenderer.removeListener('game-process-started', handleGameProcessStarted)
  //     window.electron.ipcRenderer.removeListener('game-process-exited', handleGameProcessExited)
  //   }
  // }, [running])

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
        <DrawerHeader
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: ''
          }}
        >
          <Typography variant="h6">{game?.name}</Typography>
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
                  borderRadius: '1rem'
                }}
              >
                <CardHeader
                  title={game?.name}
                  subheader={game?.game_type}
                  sx={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}
                  action={<FavoriteButton isFavorited={isFavorited} gameId={game.id} />}
                />
                <CardMedia image={game?.poster} component={'img'} />
                <CardActions sx={{ py: 0 }}>
                  <PlayButton />
                </CardActions>
              </Card>
            </Box>
            <Box>
              <Summary />
              <Screenshots />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Details
