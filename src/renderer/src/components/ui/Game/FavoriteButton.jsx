import { useCallback } from 'react'
import { useBoundStore } from '../../stores/BoundStore'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const FavoriteButton = ({ isFavorited, gameId }) => {
  const { toggleFavoriteGame, token, member, center_id } = useBoundStore((state) => ({
    toggleFavoriteGame: state.toggleFavoriteGame,
    token: state.token,
    member: state.member,
    center_id: state.center_id
  }))
  const handleFavorite = useCallback(async () => {
    toggleFavoriteGame(center_id, member.id, gameId, token)
  }, [gameId, toggleFavoriteGame])

  return (
    <IconButton
      variant="outlined"
      color={isFavorited ? 'error' : 'success'}
      onClick={() => handleFavorite()}
    >
      {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}
