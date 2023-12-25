import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 position-absolute top-0 start-0">
      <Spinner animation="border" role="status" style={{ width: '6rem', height: '6rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading
