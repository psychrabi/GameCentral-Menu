const Notifications = ({ notifications }) => {
  if (notifications) {
    return (
      <div className="toast-container top-0 end-0 p-3">
        <div
          className="toast fade show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-autohide={'true'}
          data-bs-delay="2000"
        >
          <div className="toast-body">
            {Object.keys(notifications).map((key) => (
              <span key={key}>{notifications[key][0]}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications
