import productTypes from '../../data/ProductTypes.json'
import PropTypes from 'prop-types'

const Headers = ({ header, handleProductTypeChange, appCount }) => {
  const sortedTypes = productTypes.sort((a, b) => (a.description < b.description ? -1 : 1))

  return (
    <div className="pb-2 mt-2 d-flex justify-content-between">
      <h2 className="h3 mb-0">
        {header} {appCount ? `(${appCount})` : ''}
      </h2>

      <label htmlFor="app-category" className="visually-hidden">
        Product Category
      </label>
      <select
        className="form-select"
        style={{ width: '12rem' }}
        defaultValue=""
        onChange={handleProductTypeChange}
      >
        <option value="">All Apps</option>
        {sortedTypes.map(({ category, description, id }) => (
          <option value={category} key={id}>
            {' '}
            {description}{' '}
          </option>
        ))}
      </select>
    </div>
  )
}

Headers.propTypes = {
  appCount: PropTypes.any,
  handleProductTypeChange: PropTypes.any,
  header: PropTypes.any
}

export default Headers
