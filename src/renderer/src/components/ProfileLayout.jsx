import { Suspense, useEffect, useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../assets/css/Profile.css'
import { Loading } from './ui/Loading.jsx'
import notificationContext from '../context/notificationContext'
import { useAuthStore } from './stores/AuthStore.js'

export default function ProfileLayout() {
  // const { showAlert } = useContext(notificationContext)
  // const { messages, alert } = useAuthStore()
  // useEffect(() => {
  //   if (messages && alert) {
  //     showAlert(messages, alert)
  //   }
  // }, [messages, alert])

  return (
    <>
      <div className="card mt-2">
        <div className="container-fluid px-4 mt-4">
          <nav className="nav nav-borders">
            <NavLink className="nav-link ms-0" to="/profile/details">
              Profile
            </NavLink>
            <NavLink className="nav-link" to="/profile/sessions">
              Sessions
            </NavLink>
            <NavLink className="nav-link" to="/profile/security">
              Security
            </NavLink>
            {/* <NavLink className="nav-link" to="/profile/notification">
                  Notifications
              </NavLink> */}
          </nav>
          <hr className="mt-0 mb-4" />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  )
}
