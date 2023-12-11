import { useState } from 'react'
import { NotificationProvider } from './notificationContext'
import PropTypes from 'prop-types'

const Notification = ({ children }) => {
  const [showAlert, toggleAlert] = useState(false)
  const [message, setMessage] = useState([''])
  const [type, setType] = useState('')
  return (
    <NotificationProvider
      value={{
        showAlert: (text, alert) => {
          toggleAlert(true)
          setMessage(text)
          setType(alert)
          setTimeout(() => {
            toggleAlert(false)
            setMessage([''])
            setType('')
          }, 3000)
        }
      }}
    >
      {children}
      {showAlert && (
        <div className="toast-container bottom-0 start-0 p-3" style={{ zIndex: 5000 }}>
          <div
            className={`toast d-flex fade show  ${type === 'success' ? 'bg-success' : 'bg-danger'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-autohide={'true'}
            data-bs-delay="1000"
          >
            <div className="toast-body text-light">
              {Object.keys(message).map((key) => (
                <span key={key}>{message[key][0]}</span>
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
      )}
    </NotificationProvider>
  )
}
Notification.propTypes = {
  children: PropTypes.any
}
export default Notification
