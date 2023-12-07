import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export const Notifications = ({ messages, alert, setMessages, setAlert }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const closeNotification = setTimeout(() => {
      setShow(false)
      setMessages(null)
      setAlert(null)
    }, 2000)

    return () => {
      clearInterval(closeNotification)
    }
  }, [])
  if (messages) {
    return (
      <div className="toast-container top-0 end-0 p-3" style={{ zIndex: 2000 }}>
        <div
          className={`toast fade ${show ? 'show' : ''} ${
            alert === 'success' ? 'bg-success' : 'bg-danger'
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-autohide={'true'}
          data-bs-delay="1000"
        >
          <div className="toast-body text-light">
            {Object.keys(messages).map((key) => (
              <span key={key}>{messages[key][0]}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

Notifications.propTypes = {
  messages: PropTypes.any,
  alert: PropTypes.string,
  setMessages: PropTypes.func,
  setAlert: PropTypes.func

}

export default Notifications
