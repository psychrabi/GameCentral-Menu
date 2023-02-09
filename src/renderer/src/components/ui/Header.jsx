import PropTypes from 'prop-types'
import Search from '../form/Search.jsx'
import { useCallback, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useStateContext } from '../contexts/ContextProvider.jsx'

const Headers = ({ title, categories, handleCategoriesChange, count, setSearch }) => {
  const { setNotifications } = useStateContext()

  const [show, setShow] = useState(false)
  const [game, setGame] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const sortedCategories = categories?.sort((a, b) => a.description.localeCompare(b.description))
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    console.log('form sibmitted')
  }

  const handleSelectExecutable = useCallback(async () => {
    try {
      const selectedFilePath = await window.api.selectExecutable()
      if (selectedFilePath) {
        console.log(selectedFilePath)
        setGame({ ...game, executable: selectedFilePath })
      } else {
        setNotifications('File dialog was cancelled')
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="container-fluid d-flex flex-wrap justify-content-between border-bottom mb-2 py-2">
      <div className={'d-flex'}>
        <h2 className="h3 me-3 mb-2 mb-lg-0">
          {' '}
          {title} {count ? `(${count})` : ''}{' '}
        </h2>
        {setSearch && <Search setSearch={setSearch} />}
      </div>
      {categories && (
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
      )}
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        onSubmit={handleSubmit}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="modal-90w"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-2 mb-3">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Name">
                  <Form.Control type="text" placeholder="Game's Name" autoFocus required />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Game Type">
                  <Form.Select aria-label="Floating label select example" required>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Executable">
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    required
                    onClick={handleSelectExecutable}
                    value={game.executable}
                    onChange={(ev) => setGame({ ...game, executable: ev.target.value })}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Parameters">
                  <Form.Control type="text" placeholder="parameters" />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="App ID">
                  <Form.Control type="text" placeholder="App ID" />
                </FloatingLabel>
              </Col>
            </Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Poster</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Screenshots</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Summary</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Videos</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Understood
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

Headers.propTypes = {
  title: PropTypes.any.isRequired,
  categories: PropTypes.array,
  count: PropTypes.any,
  handleCategoriesChange: PropTypes.func,
  setSearch: PropTypes.any
}

export default Headers
