import { LoadingButton } from '@mui/lab'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useBoundStore } from '../../stores/BoundStore'

export const PlayButton = () => {
  const { game, runExecutable, running } = useBoundStore((state) => ({
    game: state.game,
    runExecutable: state.runExecutable,
    running: state.running
  }))
  return (
    <>
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
    </>
  )
}
