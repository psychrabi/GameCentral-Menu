import React from 'react'
import Filter from '../Filter.jsx'
import { useBoundStore } from '../../stores/BoundStore.js'
import { Box, Typography } from '@mui/material'

const Header = ({ categories }) => {
  const { count, title } = useBoundStore((state) => ({ count: state.count, title: state.title }))

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={2}
      backgroundColor={''}
    >
      <Typography variant="h6" flexGrow={1}>
        {title} ({count})
      </Typography>

      <Filter categories={categories}  />
    </Box>
  )
}

export default Header
