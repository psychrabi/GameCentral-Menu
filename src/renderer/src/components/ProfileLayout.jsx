import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../assets/css/Profile.css'
import { Loading } from './ui/Loading.jsx'

export default function ProfileLayout() {
  return (
    <>
      <div className="card mt-2">
        <div className="container-fluid p-2">
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
          <hr className="mt-0 mb-2" />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  )
}
