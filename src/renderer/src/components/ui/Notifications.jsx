import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const Notifications = ({ messages, alert }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const closeNotificationId = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(closeNotificationId)
  }, [])

  return (
    messages && (
      <div
        className={`toast-container bottom-0 start-0 p-3 ${show ? 'show' : ''}`}
        style={{ zIndex: 2000 }}
      >
        <div
          className={`toast d-flex fade ${alert === 'success' ? 'bg-success' : 'bg-danger'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-autohide="true"
          data-bs-delay="1000"
        >
          <div className="toast-body text-light">
            {Object.keys(messages).map((key) => (
              <span key={key}>{messages[key][0]}</span>
            ))}
          </div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    )
  )
}

Notifications.propTypes = {
  messages: PropTypes.any,
  alert: PropTypes.string,
  setMessages: PropTypes.func,
  setAlert: PropTypes.func
}

export default Notifications
