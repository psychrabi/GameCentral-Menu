import PropTypes from 'prop-types'
import { useCallback } from 'react'
import Filter from '../form/Filter.jsx'
import { useBoundStore } from '../stores/BoundStore.js'

const Header = ({ categories }) => {
  const count = useBoundStore((state) => state.count)
  const title = useBoundStore((state) => state.title)

  return (
    <div className="d-flex flex-wrap justify-content-between border-bottom mb-2 py-2 align-items-center">
      <h3 className="fs-5 mb-2 mb-lg-0">
        {title} ({count})
      </h3>

      <Filter categories={categories} />
    </div>
  )
}

Header.propTypes = {
  categories: PropTypes.array,
  page_title: PropTypes.string,
  count: PropTypes.number
}

export default Header
