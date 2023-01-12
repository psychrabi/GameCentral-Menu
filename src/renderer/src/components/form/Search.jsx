const Search = (props) => {
  const setSearch = props.setSearch
  const handleSubmit = (ev) => {
    ev.preventDefault()
  }
  return (
    <form
      className="col-auto col-lg-auto mb-2 mb-lg-0 me-lg-auto"
      role="search"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search" className="visually-hidden">
        Search
      </label>
      <input
        type="search"
        className="form-control"
        placeholder="Search..."
        name="search"
        id="search"
        aria-label="Search"
        onChange={(event) => setSearch(event.target.value)}
      />
    </form>
  )
}

export default Search
