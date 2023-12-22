import { useState } from 'react'
import { NotificationProvider } from './notificationContext'
import PropTypes from 'prop-types'
import { useBoundStore } from '../components/stores/BoundStore'

const Notification = ({ children }) => {
  const messages = useBoundStore((state) => state.messages)
  const setMessages = useBoundStore((state) => state.setMessages)
  const alert = useBoundStore((state) => state.alert)
  const setAlert = useBoundStore((state) => state.setAlert)

  const [showAlert, toggleAlert] = useState(false)
  return (
    <NotificationProvider
      value={{
        showAlert: () => {
          toggleAlert(true)
          setMessages(messages)
          a(alert)
          setTimeout(() => {
            toggleAlert(false)
            setMessages(null)
            setAlert(null)
          }, 3000)
        }
      }}
    >
      {children}
      {showAlert && (
        <div className="toast-container bottom-0 start-0 p-3" style={{ zIndex: 5000 }}>
          <div
            className={`toast d-flex fade show  ${
              alert === 'success' ? 'bg-success' : 'bg-danger'
            }`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-autohide={'true'}
            data-bs-delay="1000"
          >
            <div className="toast-body text-light">
              <span>{messages}</span>
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
