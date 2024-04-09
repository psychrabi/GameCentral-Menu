import { useCallback, useEffect, useState } from 'react'
import { NotificationProvider } from './NotificationContext'
import PropTypes from 'prop-types'
import { useBoundStore } from '../components/stores/BoundStore'
import { Snackbar, Alert } from '@mui/material'

const Notification = ({ children }) => {
  const { messages, setMessages, alert, setAlert } = useBoundStore((state) => ({
    messages: state.messages,
    setMessages: state.setMessages,
    alert: state.alert,
    setAlert: state.setAlert
  }))
  const [showAlert, setShowAlert] = useState(false)

  const handleClose = useCallback(() => {
    setShowAlert(false)
    setMessages('')
    setAlert('')
  })

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
        <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert} variant="filled" sx={{ width: '100%' }}>
            {messages}
          </Alert>
        </Snackbar>
      )}
    </NotificationProvider>
  )
}
Notification.propTypes = {
  children: PropTypes.any
}
export default Notification
