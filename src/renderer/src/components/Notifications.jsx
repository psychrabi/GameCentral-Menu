import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export const Notifications = ({ notifications }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const closeNotification = setTimeout(() => {
      setShow(false)
      console.log('asd')
    }, 5000)

    return () => {
      clearInterval(closeNotification)
    }
  }, [])
  if (notifications) {
    return (
      <div className="toast-container top-0 end-0 p-3" style={{ zIndex: 2000 }}>
        <div
          className={`toast fade ${show ? 'show' : ''} bg-danger`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-autohide={'true'}
          data-bs-delay="2000"
        >
          <div className="toast-body text-light">
            {Object.keys(notifications).map((key) => (
              <span key={key}>{notifications[key][0]}</span>
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
  }
}

Notifications.propTypes = {
  notifications: PropTypes.any
}

export default Notifications
