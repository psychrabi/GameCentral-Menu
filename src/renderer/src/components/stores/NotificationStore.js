// notificationStore.js
import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: {
    message: '',
    type: '',
    isVisible: false
  },
  showNotification: (message, type) => {
    set(() => ({
      notification: {
        message,
        type,
        isVisible: true
      }
    }))

    // Automatically hide the notification after a certain time (e.g., 5 seconds)
    setTimeout(() => {
      set(() => ({
        notification: {
          message: '',
          type: '',
          isVisible: false
        }
      }))
    }, 5000)
  }
}))

export default useNotificationStore
