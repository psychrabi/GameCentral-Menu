import React, { lazy, useMemo, useEffect, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useBoundStore } from './stores/BoundStore'
import notificationContext from '../context/NotificationContext'

const Timer = lazy(() => import('./ui/Timer'))
const Navigation = lazy(() => import('./ui/Navigation'))
const Details = lazy(() => import('./ui/Details'))

function MemberLayout() {
  const token = useBoundStore((state) => state.token)
  const loading = useBoundStore((state) => state.loading)
  const center_id = useBoundStore((state) => state.center_id)
  const show = useBoundStore((state) => state.show)
  const messages = useBoundStore((state) => state.messages)
  const alert = useBoundStore((state) => state.alert)
  const { showAlert } = useContext(notificationContext)

  // Redirect if the user is not logged in or has no center_id
  if (!center_id) {
    // console.log('no center id')
    return <Navigate to="/admin" />
  }

  // Show loading spinner while data is being loaded

  useEffect(() => {
    if (messages && alert) {
      console.log(messages)
      showAlert(messages, alert)
    }
  }, [messages, alert])

  // Memoize the Timer component to prevent unnecessary re-renders

  // Memoize Details component to prevent unnecessary re-renders
  const MemoizedDetails = useMemo(() => React.memo(Details), [])
  const MemoizedNavigation = useMemo(() => React.memo(Navigation), [])

  return (
    <>
      <MemoizedNavigation />
      <div className="game-app">
        <main className="no-scrollbar">
          {/* <div className="w-100"> */}
          {/* Render nested routes */}
          <Outlet />
          {/* </div> */}
        </main>
        {/* Conditional rendering of Details and Notifications components */}
        {show && <MemoizedDetails />}
        {/* {messages && <Notifications messages={messages} alert={alert} />} */}
      </div>
    </>
  )
}

export default MemberLayout
