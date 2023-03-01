import { useState } from 'react'

export default function useFilter(list, categories, column) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')

  const filteredList = list?.filter((item) => {
    // filter based on search search
    if (search.trim() && !item.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    // filter based on selected category
    if (type && type !== item[column]) {
      return false
    }

    // include the item in the filtered list
    return true
  })

  return {
    setSearch,
    setType,
    filteredList
  }
}
