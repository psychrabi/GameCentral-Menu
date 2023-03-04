import { useDataStore } from '../stores/DataStore'

const Filter = ({ categories, handleCategoriesChange }) => {
  const filter = useDataStore((state) => state.filter)
  const setFilter = useDataStore((state) => state.setFilter)
  const type = useDataStore((state) => state.type)
  const setType = useDataStore((state) => state.setType)
  const handleSubmit = (ev) => {
    ev.preventDefault()
  }

  const handleFilterUpdate = (value) => {
    if (value) {
      setType('')
    }
    setFilter(value)
  }

  return (
    <div className="d-flex">
      <form className="me-2" role="search" onSubmit={handleSubmit}>
        <label htmlFor="search" className="visually-hidden">
          Search
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          name="search"
          id="search"
          aria-label="Search"
          value={filter}
          onInput={(event) => handleFilterUpdate(event.target.value)}
        />
      </form>

      <div className="form-group">
        <label htmlFor="categories" className="visually-hidden">
          Category
        </label>
        <select
          id="categories"
          className="form-select"
          style={{ width: '12rem' }}
          value={type || ''}
          aria-label="Select a game type"
          onChange={(ev) => handleCategoriesChange(ev)}
        >
          <option value="">All </option>
          {categories
            ?.sort((a, b) => a.description.localeCompare(b.description))
            .map(({ category, description, id }) => (
              <option value={category} key={id}>
                {description}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export default Filter
