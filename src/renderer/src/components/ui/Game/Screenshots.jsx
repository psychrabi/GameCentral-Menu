import { Card, CardContent, CardHeader, ImageList, ImageListItem } from '@mui/material'
import React from 'react'
import { useBoundStore } from '../../stores/BoundStore'

export const Screenshots = () => {
  const { game } = useBoundStore((state) => ({
    game: state.game
  }))
  return (
    <Card>
      <CardHeader title="Screenshots" sx={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }} />
      <CardContent>
        <ImageList
          sx={{
            width: '100%',
            height: '500px',
            overflow: 'auto',
            position: 'relative',
            margin: 0
          }}
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
  )
}
