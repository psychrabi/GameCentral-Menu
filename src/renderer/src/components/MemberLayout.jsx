import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, Navigate, NavLink } from 'react-router-dom'
import axiosClient from '../lib/axios-client'
import { useStateContext } from './contexts/ContextProvider'
import Navigation from './ui/Navigation'
import Details from './ui/Details'
import { removeFromLocalStorage } from '../utils/removeFromLocalStorage.js'

export default function MemberLayout() {
  const { token, notification, setToken, show } = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  const [durationString, setDurationString] = useState('')

  const [cost, setCost] = useState(0)

  const [member, setMember] = useState(JSON.parse(localStorage.getItem('member')))

  const [session, setSetSession] = useState(JSON.parse(localStorage.getItem('session')))
  const sessionType = useMemo(() => localStorage.getItem('sessionType'), [])

  const COST_PER_HOUR = 30

  const [startTime, setStartTime] = useState(parseInt(localStorage.getItem('start_time')))

  const startTimeString = useMemo(
    () => new Date(parseInt(localStorage.getItem('start_time'))).toLocaleTimeString(),
    [startTime]
  )

  const onLogout = useCallback(() => {
    const endTime = Date.now()
    const usage_details = {
      session_cost: calculateCost((endTime - startTime) / 1000),
      total_time: Math.floor(calculateDurationInSeconds()),
      sessionType: sessionType,
      session_id: session.id
    }
    console.log(usage_details)
    axiosClient.post('/members/logout', usage_details).then(() => {
      setMember([])
      setToken(null)
      removeFromLocalStorage('member')
      removeFromLocalStorage('session')
      removeFromLocalStorage('sessionType')
      removeFromLocalStorage('start_time')
      return <Navigate to="/login" />
    })
    // console.log(JSON.parse(localStorage.getItem("data")));
  }, [])

  function secondsToHms(d) {
    // Set the duration state to the number of hours, minutes, and seconds
    if (isNaN(d)) return '00:00:00'
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.floor((d % 3600) % 60)
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    // setStartTime(parseInt(localStorage.getItem('start_time')))
    setSetSession(JSON.parse(localStorage.getItem('session')))
    const intervalId = setInterval(() => {
      // Calculate the duration of the session in seconds
      const durationInSeconds = calculateDurationInSeconds()
      const string = secondsToHms(durationInSeconds.toFixed(0))
      setDurationString(string)
      const cost = calculateCost(durationInSeconds)
      setCost(cost)
    }, 15000)
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const calculateDurationInSeconds = () => {
    return (Date.now() - startTime) / 1000
  }

  const calculateCost = (durationInSeconds) => {
    const durationInHours = durationInSeconds / (60 * 60)
    return (durationInHours * COST_PER_HOUR).toFixed(2)
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
              {notification && <div className="notification">{notification}</div>}
              {!notification && (
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
              )}
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
                      className={`rounded-circle ms-3 me-2 border border-3 ${sessionType === 'balance' ? 'border-success' : 'border-danger'}`} />
                    <span>
                      {member.first_name} {member.last_name}
                      <br />
                      <small>
                        <b>Balance: </b> $ {member.balance}
                      </small>
                    </span>
                  </div>
                </NavLink>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/profile">
                      {' '}
                      Profile{' '}
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <span className="dropdown-item" onClick={() => onLogout()}>
                      {' '}
                      Sign out{' '}
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
      </div>
    </>
  )
}
