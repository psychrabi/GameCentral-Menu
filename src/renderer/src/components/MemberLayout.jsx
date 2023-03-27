import { Navigate, NavLink, Outlet } from 'react-router-dom'
import Notifications from './Notifications'
import { useAuthStore } from './stores/AuthStore'
import { useDataStore } from './stores/DataStore'
import Details from './ui/Details'
import { Loading } from './ui/Loading'
import Navigation from './ui/Navigation'
import { Timer } from './ui/Timer'

export default function MemberLayout() {
  const { token, loading } = useAuthStore()

  const { show, error, notifications } = useDataStore()

  if (!token) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Notifications notifications={error} />
  }
  if (notifications) {
    return <Notifications notifications={notifications} />
  }

  return (
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
              <Timer />
              <Navigation />
            </div>
          </div>
        </div>
      </header>
      <div className="game-app">
        <main className="no-scrollbar">
          <div className="w-100">
            <Outlet />
          </div>
        </main>
        {show && <Details />}
      </div>
    </>
  )
}
