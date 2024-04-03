import { useCallback, useEffect, useState } from 'react'
import { NotificationProvider } from './NotificationContext'
import PropTypes from 'prop-types'
import { useBoundStore } from '../components/stores/BoundStore'

const Notification = ({ children }) => {
  const { messages, setMessages, alert, setAlert } = useBoundStore((state) => ({
    messages: state.messages,
    setMessages: state.setMessages,
    alert: state.alert,
    setAlert: state.setAlert
  }))
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false)
        setMessages('')
        setAlert('')
      }, 1500)
      return () => clearTimeout(timeoutId)
    }
  }, [showAlert])

  const displayAlert = useCallback(
    (newMessages, newAlert) => {
      setMessages(newMessages)
      setAlert(newAlert)
      setShowAlert(true)
    },
    [setMessages, setAlert, setShowAlert]
  )

  return (
    <NotificationProvider value={{ showAlert: displayAlert }}>
      {children}
      {showAlert && (
        <div className="toast-container bottom-0 start-0 p-3">
          <div
            className={`toast fade show ${alert === 'success' ? 'text-bg-success' : 'text-bg-danger'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body text-light">
                <span>{messages}</span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
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
