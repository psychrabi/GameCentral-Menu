import { Suspense, lazy } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../assets/css/Profile.css'

export default function ProfileLayout() {
  const navItems = [
    { name: "Profile", path: "/profile/details" },
    { name: "Sessions", path: "/profile/sessions" },
    { name: "Security", path: "/profile/security" },
    // { name: "Notifications", path: "/profile/notification" },
  ];

  return (
    <>
      <div className="card mt-2">
        <div className="card-header">
          <nav className="nav nav-tabs card-header-tabs nav-fill">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink className={`nav-link ${index === 0 ? 'ms-0' : ''}`} to={item.path}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </nav>
        </div>
        <div className="card-body p-2">
          <Outlet />
        </div>
      </div>
    </>
  )
}
