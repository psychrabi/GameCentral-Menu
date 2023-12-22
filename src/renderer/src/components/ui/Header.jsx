import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import Filter from '../form/Search.jsx'
import { useDataStore } from '../stores/DataStore.js'

const Header = ({ categories, page_title }) => {
  const setType = useDataStore((state) => state.setType)
  const setFilter = useDataStore((state) => state.setFilter)
  const count = useDataStore((state) => state.count)
  const [title, setTitle] = useState(page_title)

  const handleCategoriesChange = useCallback((event) => {
    let index = event.target.selectedIndex
    setTitle(event.target[index].text)
    if (event.target.value) {
      setFilter('')
    }
    setType(event.target.value)
  }, [])

  return (
    <div className="d-flex flex-wrap justify-content-between border-bottom mb-2 py-2">
      <h2 className="h3 mb-2 mb-lg-0">
        {title} ({count})
      </h2>
      <div className="d-flex">
        <Filter categories={categories} handleCategoriesChange={handleCategoriesChange} />
      </div>
    </div>
  )
}

Header.propTypes = {
  categories: PropTypes.array,
  page_title: PropTypes.string,
  count: PropTypes.number
}

export default Header
