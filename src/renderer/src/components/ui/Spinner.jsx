export const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-border text-primary spinner-border"
        role="status"
        style={{ width: '4rem', height: '4rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
