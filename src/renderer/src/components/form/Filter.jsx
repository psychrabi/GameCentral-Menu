import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useBoundStore } from '../stores/BoundStore'
import { useCallback } from 'react'

const Filter = ({ categories }) => {
  const filter = useBoundStore((state) => state.filter)
  const setFilter = useBoundStore((state) => state.setFilter)
  const type = useBoundStore((state) => state.type)
  const setType = useBoundStore((state) => state.setType)
  const setTitle = useBoundStore((state) => state.setTitle)

  const handleCategoriesChange = useCallback((event) => {
    let index = event.target.selectedIndex
    setTitle(event.target[index].text)

    if (event.target.value) setFilter('')
    setType(event.target.value)
  }, [])

  const handleFilterUpdate = useCallback((value) => {
    if (value) setType('')
    setFilter(value)
  }, [])

  return (
    <>
      <Form role="search" onSubmit={(ev) => ev.preventDefault()}>
        <Row className="g-2">
          <Col md>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Search..."
              value={filter}
              onInput={(event) => handleFilterUpdate(event.target.value)}
            />
          </Col>
          <Col md>
            <Form.Select
              size="sm"
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
          </Col>
        </Row>
      </Form>
    </>
  )
}

Filter.propTypes = {
  categories: PropTypes.array
}
export default Filter
