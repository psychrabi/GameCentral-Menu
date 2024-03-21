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
  }));
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false);
        setMessages(null);
        setAlert(null);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [showAlert, setMessages, setAlert]);

  const displayAlert = useCallback(() => {
    setShowAlert(true);
    setMessages(messages);
    setAlert(alert);
  }, [messages, alert, setMessages, setAlert, setShowAlert]);

  return (
    <NotificationProvider value={{ showAlert: displayAlert }}>
      {children}
      {showAlert && (
        <div className="toast-container bottom-0 start-0 p-3" style={{ zIndex: 5000 }}>
          <div
            className={`toast fade show ${alert === 'success' ? 'bg-success' : 'bg-danger'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-autohide="true"
            data-bs-delay="1000"
          >
            <div className="toast-body text-light">
              <span>{messages}</span>
            </div>
          </div>
        </div>
      )}
    </NotificationProvider>
  );
};
Notification.propTypes = {
  children: PropTypes.any
}
export default Notification
