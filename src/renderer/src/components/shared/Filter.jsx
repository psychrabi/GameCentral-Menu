import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import { useBoundStore } from '../stores/BoundStore'

const Filter = React.memo(({ categories }) => {
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

  const handleCategoriesChange = useCallback(
    (event) => {
      console.log(event.target.text)
      const { value, selectedIndex, [selectedIndex]: selectedOption } = event.target
      setTitle(selectedOption.text)

      if (value) setFilter('')
      setType(value)
    },
    [setFilter, setType, setTitle]
  )

  const handleFilterUpdate = useCallback(
    (value) => {
      if (value) setType('')
      setFilter(value)
    },
    [setType, setFilter]
  )

  return (
    <form role="search" onSubmit={(ev) => ev.preventDefault()}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          onChange={(ev) => handleFilterUpdate(ev.target.value)}
          value={filter}
          type="text"
        />
        <FormControl fullWidth sx={{ marginLeft: 1 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="Select a game type"
            id="demo-simple-select"
            value={type || ''}
            label="Age"
            onChange={(ev) => handleCategoriesChange(ev)}
            size="small"
          >
            <MenuItem value={''}>All</MenuItem>
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
})

Filter.propTypes = {
  categories: PropTypes.array
}
export default Filter
