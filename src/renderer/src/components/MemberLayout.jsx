import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import axiosClient from '../lib/axios-client'
import { removeFromLocalStorage } from '../utils/removeFromLocalStorage.js'
import { useStateContext } from './contexts/ContextProvider'
import Notifications from './Notifications'
import Details from './ui/Details'
import { Loading } from './ui/Loading'
import Navigation from './ui/Navigation'

export default function MemberLayout() {
  const { token, notifications, setToken, show, setNotifications } = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }
  const [loading, setLoading] = useState(false)

  const [durationString, setDurationString] = useState('')

  const [cost, setCost] = useState(0)

  const [member, setMember] = useState(JSON.parse(localStorage.getItem('member')))

  const [session, setSetSession] = useState(JSON.parse(localStorage.getItem('session')))
  const sessionType = useMemo(() => localStorage.getItem('sessionType'), [])

  const COST_PER_HOUR = 60

  const [startTime, setStartTime] = useState(parseInt(localStorage.getItem('start_time')))

  const startTimeString = useMemo(
    () => new Date(parseInt(localStorage.getItem('start_time'))).toLocaleTimeString(),
    [startTime]
  )

  const onLogout = useCallback(() => {
    setLoading(true)
    const endTime = Date.now()
    const usage_details = {
      session_cost: calculateCost((endTime - startTime) / 1000),
      total_time: Math.floor(calculateDurationInSeconds()),
      sessionType: sessionType,
      session_id: session.id
    }
    axiosClient.post('/members/logout', usage_details).then(() => {
      setMember([])
      setToken(null)
      removeFromLocalStorage('member')
      removeFromLocalStorage('session')
      removeFromLocalStorage('sessionType')
      removeFromLocalStorage('start_time')
      setNotifications('You have been successfully logged out.')
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
    // eslint-disable-next-line prettier/prettier
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    startTime ?? setStartTime(parseInt(localStorage.getItem('start_time')))
    setDurationString('00:00:00')
    setCost('0.00')
    setSetSession(JSON.parse(localStorage.getItem('session')))

    // const sessionDuration = (
    //   ((member.balance + member.bonus_balance) / COST_PER_HOUR) *
    //   (60 * 60)
    // ).toFixed(0)
    // console.log(sessionDuration)
    const intervalId = setInterval(() => {
      // Calculate the duration of the session in seconds
      const durationInSeconds = calculateDurationInSeconds()
      const string = secondsToHms(durationInSeconds.toFixed(0))
      setDurationString(string)
      const cost = calculateCost(durationInSeconds)
      setCost(cost)
    }, 15000)
    const intervalId2 = setInterval(() => {
      console.log('session duration ended')
      if (cost > member.balance + member.bonus_balance) {
        setNotifications(
          'Your session cost is higher than balance. Difference will be added to credit'
        )
      }
      if (cost > member.balance + member.bonus_balance + 30) {
        setNotifications(
          'Your credit is more than 30. You will be logged out shortly and will not be able to login before clearing your credit.'
        )
        onLogout()
      }
    }, 60000)
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
      clearInterval(intervalId2)
    }
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
      {loading && <Loading />}
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
                    <span className="dropdown-item" onClick={() => onLogout()}>
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
