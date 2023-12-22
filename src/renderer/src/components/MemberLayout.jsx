import React, { useMemo } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from './stores/AuthStore'
import { useDataStore } from './stores/DataStore'
import Details from './ui/Details'
import { Loading } from './ui/Loading'
import Navigation from './ui/Navigation'
import { Timer } from './ui/Timer'
import Notifications from './ui/Notifications'
import { useContext, useEffect } from 'react'
import notificationContext from '../context/notificationContext'

// Memoized Details component to prevent unnecessary re-renders
const MemoizedDetails = React.memo(Details)

function MemberLayout() {
  const token = useAuthStore((state) => state.token)
  const loading = useAuthStore((state) => state.loading)
  const center_id = useAuthStore((state) => state.center_id)
  const show = useDataStore((state) => state.show)
  const messages = useDataStore((state) => state.messages)
  const alert = useDataStore((state) => state.alert)
  const { showAlert } = useContext(notificationContext)

  // Redirect if the user is not logged in or has no center_id
  if (!center_id) {
    return <Navigate to="/admin" />
  }
  if (!token) {
    console.log('Member not logged in')
    return <Navigate to="/login" />
  }

  // Memoize the Timer component to prevent unnecessary re-renders
  const memoizedTimer = useMemo(() => <Timer />, [])

  // Show loading spinner while data is being loaded

  useEffect(() => {
    if (messages && alert) {
      console.log(messages)
      showAlert(messages, alert)
    }
  }, [messages, alert])

  return loading ? (
    <Loading />
  ) : (
    <>
      <header className="draggable">
        <div className="px-3 py-2 text-bg-dark">
          <div className="container-fluid px-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
              <NavLink
                to="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <i className="bi bi-bootstrap me-3" style={{ fontSize: '2rem' }}></i>
                GameCentral Menu
              </NavLink>
              {memoizedTimer}
              <Navigation />
            </div>
          </div>
        </div>
      </header>
      <div className="game-app">
        <main className="no-scrollbar">
          <div className="w-100">
            {/* Render nested routes */}
            <Outlet />
          </div>
        </main>
        {/* Conditional rendering of Details and Notifications components */}
        {show && <MemoizedDetails />}
        {/* {messages && <Notifications messages={messages} alert={alert} />} */}
      </div>
    </>
  )
}

export default MemberLayout
