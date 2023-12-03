import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from './stores/AuthStore'
import Details from './ui/Details'
import { Loading } from './ui/Loading'
import Navigation from './ui/Navigation'
import { Timer } from './ui/Timer'
import Notifications from './ui/Notifications'

export default function MemberLayout() {
  const { token, loading, show, messages, alert } = useAuthStore()

  if (!token) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return <Loading />
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
        {messages && <Notifications messages={messages} alert={alert} />}
      </div>
    </>
  )
}
