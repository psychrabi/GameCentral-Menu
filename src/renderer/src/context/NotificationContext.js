import { createContext } from 'react'

const notificationContext = createContext()

export default notificationContext
export const NotificationProvider = notificationContext.Provider
