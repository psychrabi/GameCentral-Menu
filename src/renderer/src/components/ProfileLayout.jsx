import { Suspense, lazy } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../assets/css/Profile.css'

export default function ProfileLayout() {
  return (
    <>
      <div className="card mt-2">
        <div className="card-header">
          <nav className="nav nav-tabs card-header-tabs nav-fill">
            <li className="nav-item">
              <NavLink className="nav-link ms-0" to="/profile/details">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile/sessions">
                Sessions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile/security">
                Security
              </NavLink>
            </li>
            {/* <NavLink className="nav-link" to="/profile/notification">
                  Notifications
              </NavLink> */}
          </nav>
        </div>
        <div className="card-body p-2">
          <Outlet />
        </div>
      </div>
    </>
  )
}
