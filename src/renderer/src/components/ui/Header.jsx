import PropTypes from 'prop-types'
import Search from '../form/Search.jsx'

const Headers = ({ title, categories, handleCategoriesChange, count, setSearch }) => {
  const sortedCategories = categories.sort((a, b) => a.description.localeCompare(b.description))
  return (
    <div className="container-fluid d-flex flex-wrap justify-content-between border-bottom mb-2 py-2">
      <div className={'d-flex'}>
        <h2 className="h3 me-3 mb-2 mb-lg-0">
          {' '}
          {title} {count ? `(${count})` : ''}{' '}
        </h2>
        {title !== 'Profile' && <Search setSearch={setSearch} />}
      </div>
      <div>
        <label htmlFor="categories" className="visually-hidden">
          Category
        </label>
        <select
          id="categories"
          className="form-select"
          style={{ width: '12rem' }}
          defaultValue=""
          onChange={handleCategoriesChange}
        >
          <option value="">All</option>
          {sortedCategories.map(({ category, description, id }) => (
            <option value={category} key={id}>
              {' '}
              {description}{' '}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

Headers.propTypes = {
  categories: PropTypes.shape({
    sort: PropTypes.func
  }),
  count: PropTypes.any,
  handleCategoriesChange: PropTypes.any,
  setSearch: PropTypes.any,
  title: PropTypes.string
}

export default Headers
