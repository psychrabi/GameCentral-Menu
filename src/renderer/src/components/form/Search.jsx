import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useDataStore } from '../stores/DataStore'
import PropTypes from 'prop-types'

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
    <>
      <Form role="search" onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="search" label="Search..">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={filter}
                onInput={(event) => handleFilterUpdate(event.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingSelectGrid" label="Categories">
              <Form.Select
                aria-label="Select a game type"
                onChange={(ev) => handleCategoriesChange(ev)}
                value={type || ''}
              >
                <option value="">All </option>
                {categories
                  ?.sort((a, b) => a.description.localeCompare(b.description))
                  .map(({ category, description, id }) => (
                    <option value={category} key={id}>
                      {description}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </>
  )
}

Filter.propTypes = {
  categories: PropTypes.array,
  handleCategoriesChange: PropTypes.func
}
export default Filter
