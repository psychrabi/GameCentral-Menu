import PropTypes from 'prop-types'
import { useCallback } from 'react'
import Filter from '../form/Filter.jsx'
import { useBoundStore } from '../stores/BoundStore.js'

const Header = ({ categories }) => {
  const count = useBoundStore((state) => state.count)
  const title = useBoundStore((state) => state.title)

  return (
    <div className="d-flex flex-wrap justify-content-between border-bottom mb-2 py-2">
      <h2 className="h3 mb-2 mb-lg-0">
        {title} ({count})
      </h2>
      <div className="d-flex">
        <Filter categories={categories} />
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
