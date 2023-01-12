export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 position-absolute top-0 start-0">
      <div className="spinner-border" role="status" style={{ width: '6rem', height: '6rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
