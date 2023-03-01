import { useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useStateContext } from './contexts/ContextProvider'
import Notifications from './Notifications'
import { useAuthStore } from './stores/AuthStore'
import { useDataStore } from './stores/DataStore'
import Details from './ui/Details'
import { Loading } from './ui/Loading'
import Navigation from './ui/Navigation'

export default function MemberLayout() {
  const token = useAuthStore((state) => state.token)
  const member = useAuthStore((state) => state.member)
  const logout = useAuthStore((state) => state.logout)
  const sessionType = useAuthStore((state) => state.sessionType)
  const loading = useAuthStore((state) => state.loading)
  const start_time = useAuthStore((state) => state.start_time)
  const show = useDataStore((state) => state.show)
  const error = useDataStore((state) => state.error)
  const { notifications, setNotifications } = useStateContext()
  const COST_PER_HOUR = 60

  const sessionDuration = useMemo(
    () =>
      (((member?.balance + member?.bonus_balance) / COST_PER_HOUR) * (60 * 60) * 1000).toFixed(0),
    []
  )
  if (!token) {
    return <Navigate to="/login" />
  }

  const [durationString, setDurationString] = useState('')

  const [cost, setCost] = useState(0)

  // const [session, setSetSession] = useState(JSON.parse(localStorage.getItem('session')))

  const startTimeString = new Date(parseInt(start_time)).toLocaleTimeString()

  function secondsToHms(d) {
    // Set the duration state to the number of hours, minutes, and seconds
    if (isNaN(d)) return '00:00:00'
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.floor((d % 3600) % 60)
    // eslint-disable-next-line prettier/prettier
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    localStorage.setItem('ACCESS_TOKEN', token)
    setDurationString('00:00:00')
    setCost('0.00')

    const durationInSeconds = calculateDurationInSeconds()

    const cost = calculateCost(durationInSeconds)
    setCost(cost)

    console.log(sessionDuration)

    const intervalId = setInterval(() => {
      // Calculate the duration of the session in seconds
      const durationInSeconds = calculateDurationInSeconds()
      const string = secondsToHms(durationInSeconds.toFixed(0))
      setDurationString(string)
    }, 1000)

    const intervalId2 = setInterval(() => {
      const durationInSeconds = calculateDurationInSeconds()

      const cost = calculateCost(durationInSeconds)
      setCost(cost)
    }, 5000)

    const intervalId3 = setInterval(() => {
      if (cost > member.balance + member.bonus_balance) {
        setNotifications(
          'Your session cost is higher than balance. Difference will be added to credit'
        )
      }
      if (cost > member.balance + member.bonus_balance + 30) {
        setNotifications(
          'Your credit is more than 30. You will be logged out shortly and will not be able to login before clearing your credit.'
        )
        logout()
      }
      console.log('session duration ended')
    }, 60000)

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
      clearInterval(intervalId2)
      clearInterval(intervalId3)
    }
  }, [])

  const calculateDurationInSeconds = () => {
    return (Date.now() - start_time) / 1000
  }

  const calculateCost = (durationInSeconds) => {
    const durationInHours = durationInSeconds / (60 * 60)
    return (durationInHours * COST_PER_HOUR).toFixed(2)
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>Cannot read data : {error}</p>
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

              <ul className="nav col-8 col-md-8 col-lg-auto me-lg-auto mb-2 mb-md-0 justify-content-md-end">
                <li className="me-3">
                  <span className="fw-bold">Start at :</span> {startTimeString}
                </li>
                <li className="me-3">
                  <span className="fw-bold">Duration : </span> {durationString}
                </li>
                <li>
                  <span className="fw-bold">Session Cost: </span> $ {cost}
                </li>
              </ul>
              <Navigation />
              <div className="dropdown border-start non-draggable">
                <NavLink
                  to="/profile"
                  className="link-light text-decoration-none"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div
                    className={
                      'd-flex align-items-center justify-content-between justify-content-lg-start dropdown-toggle'
                    }
                  >
                    <img
                      src={'https://github.com/mdo.png'}
                      alt="mdo"
                      width="36"
                      height="36"
                      className={`rounded-circle ms-3 me-2 border border-3 ${
                        sessionType === 'balance' ? 'border-success' : 'border-danger'
                      }`}
                    />
                    <span>
                      {member.first_name} {member.last_name}
                      <br />
                      <small>
                        <b>Balance:</b> ${member.balance} (+{member.bonus_balance})
                      </small>
                    </span>
                  </div>
                </NavLink>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/profile/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <span className="dropdown-item" onClick={() => logout(COST_PER_HOUR)}>
                      Sign out
                    </span>
                  </li>
                </ul>
              </div>
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
        <Notifications notifications={notifications} />
      </div>
    </>
  )
}
