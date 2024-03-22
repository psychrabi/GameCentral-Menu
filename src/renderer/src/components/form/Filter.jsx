import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useBoundStore } from '../stores/BoundStore'
import React, { useCallback, useMemo } from 'react'

const Filter = React.memo(({ categories }) => {
  const { filter, setFilter, type, setType, setTitle } = useBoundStore((state) => ({
    filter: state.filter,
    setFilter: state.setFilter,
    type: state.type,
    setType: state.setType,
    setTitle: state.setTitle,
  }));

  const sortedCategories = useMemo(() => {
    return categories?.sort((a, b) => a.description.localeCompare(b.description));
  }, [categories]);

  const handleCategoriesChange = useCallback((event) => {
    const { value, selectedIndex, [selectedIndex]: selectedOption } = event.target;
    setTitle(selectedOption.text);

    if (value) setFilter('');
    setType(value);
  }, [setFilter, setType, setTitle]);

  const handleFilterUpdate = useCallback((value) => {
    if (value) setType('');
    setFilter(value);
  }, [setType, setFilter]);

  return (
    <Form role="search" onSubmit={(ev) => ev.preventDefault()}>
      <Row className="g-2">
        <Col md>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(event) => handleFilterUpdate(event.target.value)}
          />
        </Col>
        <Col md>
          <Form.Select
            size="sm"
            aria-label="Select a game type"
            onChange={handleCategoriesChange}
            value={type || ''}
          >
            <option value="">All</option>
            {sortedCategories.map(({ category, description, id }) => (
              <option value={category} key={id}>
                {description}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
});

Filter.propTypes = {
  categories: PropTypes.array
}
export default Filter
