import PropTypes from 'prop-types'
import React from 'react'
import Filter from '../Filter.jsx'
import { useBoundStore } from '../../stores/BoundStore.js'
import { Box, Typography } from '@mui/material'

const Header = React.memo(({ categories }) => {
  const { count, title } = useBoundStore((state) => ({ count: state.count, title: state.title }))

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={2}
      backgroundColor={''}
    >
      <Typography variant="h6">
        {title} ({count})
      </Typography>

      <Filter categories={categories} />
    </Box>
  )
})

Header.propTypes = {
  categories: PropTypes.array,
  page_title: PropTypes.string,
  count: PropTypes.number
}

export default Header
