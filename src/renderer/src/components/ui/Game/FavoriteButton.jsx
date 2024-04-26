import { useCallback } from 'react'
import { useBoundStore } from '../../stores/BoundStore'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const FavoriteButton = ({ isFavorited }) => {
  const toggleFavoriteGame = useBoundStore((state) => state.toggleFavoriteGame)
  const handleFavorite = useCallback(async () => {
    toggleFavoriteGame()
  }, [])

  return (
    <IconButton
      variant="outlined"
      color={isFavorited ? 'error' : ''}
      onClick={() => handleFavorite()}
    >
      {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}
