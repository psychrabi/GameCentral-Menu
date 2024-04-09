import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useBoundStore } from '../../stores/BoundStore'

export const Summary = () => {
  const { game } = useBoundStore((state) => ({
    game: state.game
  }))
  return (
    <Card sx={{ mb: 2, height: 'auto' }}>
      <CardHeader title="Summary" sx={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }} />
      <CardContent>
        <Typography variant="body1">{game?.summary}</Typography>
      </CardContent>
    </Card>
  )
}
