import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useCallback, useMemo } from 'react'

import { useBoundStore } from '../stores/BoundStore'

const Filter = ({ categories }) => {
  const { filter, setFilter, type, setType, setTitle } = useBoundStore((state) => ({
    filter: state.filter,
    setFilter: state.setFilter,
    type: state.type,
    setType: state.setType,
    setTitle: state.setTitle
  }))

  const sortedCategories = useMemo(() => {
    return categories?.sort((a, b) => a.description.localeCompare(b.description))
  }, [categories])

  const handleCategoriesChange = (event) => {
    console.log(event.target.text)
    const { value } = event.target
    setTitle(value)

    if (value) setFilter('')
    setType(value)
  }

  const handleFilterUpdate = (value) => {
    if (value) setType('')
    setFilter(value)
  }

  return (
    <form role="search" onSubmit={(ev) => ev.preventDefault()}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 400
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          onChange={(ev) => handleFilterUpdate(ev.target.value)}
          value={filter}
          type="text"
          fullWidth
        />
        <FormControl fullWidth sx={{ marginLeft: 1 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={type || ''}
            label="Category"
            onChange={(ev) => handleCategoriesChange(ev)}
            size="small"
          >
            <MenuItem value={'All Games'}>All</MenuItem>
            {sortedCategories.map(({ category, description, id }) => (
              <MenuItem value={category} key={id} id={description}>
                {description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </form>
  )
}

export default Filter
