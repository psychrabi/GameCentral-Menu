import React, { lazy, useMemo } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useBoundStore } from './stores/BoundStore'

import { useContext, useEffect } from 'react'
import notificationContext from '../context/notificationContext'
const Loading = lazy(() => import('./ui/Loading'))
const Timer = lazy(() => import('./ui/Timer'))
const Navigation = lazy(() => import('./ui/Navigation'))
const Details = lazy(() => import('./ui/Details'))

// Memoized Details component to prevent unnecessary re-renders
const MemoizedDetails = React.memo(Details)

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
