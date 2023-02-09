import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../assets/css/Profile.css'
import { useStateContext } from './contexts/ContextProvider'
import Header from './ui/Header.jsx'
import { Loading } from './ui/Loading.jsx'
export default function ProfileLayout() {
  const { title } = useStateContext()
  return (
    <>
      <Header title={title} />

      <div className="card animated fadeInDown">
        <div className="container-fluid px-4 mt-4">
          <nav className="nav nav-borders">
            <NavLink className="nav-link ms-0" to="/profile/profile">
              Profile
            </NavLink>
            <NavLink className="nav-link" to="/profile/billing">
              Billing
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
