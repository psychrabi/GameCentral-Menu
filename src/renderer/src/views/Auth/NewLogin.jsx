import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useStateContext } from '../../components/contexts/ContextProvider'
import Notifications from '../../components/Notifications'
import axiosClient from '../../lib/axios-client'
import logo from '../../public/logo512.png'
import video from '../../public/video.mp4'

import { useAuthStore } from '../../components/stores/AuthStore'
import { Loading } from '../../components/ui/Loading'

export default function Login() {
  const loading = useAuthStore((state) => state.loading)
  const error = useAuthStore((state) => state.error)
  const token = useAuthStore((state) => state.token)
  const member = useAuthStore((state) => state.member)
  const authenticate = useAuthStore((state) => state.authenticate)
  const setSessionType = useAuthStore((state) => state.setSessionType)

  if (token) {
    return <Navigate to="/" />
  }

  const loginRef = useRef()
  const passwordRef = useRef()

  const { setNotifications, notifications } = useStateContext()
  const [clientStats, setClientStats] = useState(localStorage.getItem('systemInfo'))

  const setSystemInfo = (info) => {
    setClientStats({
      hostname: info.osInfo.hostname,
      cpu: info.cpu.manufacturer + ' ' + info.cpu.brand,
      graphics: info.graphics.controllers.filter((controller) => controller.vram > 0)[0].model,
      ram: (info.mem.total / (1024 * 1024 * 1024)).toFixed(2) + 'GB',
      os: info.osInfo.distro + ' build ' + info.osInfo.build,
      ip4: info.networkInterfaces[0].ip4
    })
  }

  function onSubmit(ev) {
    ev.preventDefault()
    authenticate(loginRef.current.value, passwordRef.current.value)
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    setNotifications(error)
  }

  if (member) {
    const sessionType = member.balance > 0 || member.bonus_balance > 0 ? 'balance' : 'credit'
    if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
      setNotifications('Not enough balance. Please top up your account.')
      return
    }
    if (member.credit > 30) {
      setNotifications(`You have ${member.credit} credit to be paid. Please pay it first.`)
      return
    }
    setSessionType(sessionType)
  }

  const getClientInfo = useCallback(async () => {
    try {
      let SystemInfo = await window.api.getSystemInfo()
      setSystemInfo(SystemInfo)
      localStorage.setItem('systemInfo', JSON.stringify(SystemInfo))
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('systemInfo')) {
      getClientInfo()
    } else {
      setSystemInfo(JSON.parse(localStorage.getItem('systemInfo')))
    }
  }, [])

  return (
    <>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <div className="login">
            <h2 className="display-1 fw-normal text-light position-absolute top-0 start-0 mt-5 ms-5 hostname">
              {clientStats?.hostname ?? 'GameCenter Menu Client'}
            </h2>
            <video className="video url-video" autoPlay={true} muted loop>
              <source type="video/mp4" src={video} id="url-video" />
            </video>
            <main className="form-signin">
              <form onSubmit={onSubmit} autoComplete="off" className={'mb-3'}>
                <img src={logo} alt="" style={{ width: '8rem', height: '8rem' }} />
                <h3 className="my-3 text-light" id="cafe-name">
                  Hak3rz Juction Cafe
                </h3>
                <h4 className="h4 mb-3 fw-normal text-light">Please sign in</h4>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    ref={loginRef}
                    id="login-member"
                    placeholder="Username or Email address"
                  />
                  <label htmlFor="login-member">Username or Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    ref={passwordRef}
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>
            </main>
            <Notifications notifications={notifications} />
            <footer className="position-absolute bottom-0 mb-5 me-5 end-0 text-light">
              <ul className="list-unstyled text-start text-small">
                <li>
                  {' '}
                  CPU : <span className="cpu">{clientStats?.cpu}</span>
                </li>
                <li>
                  {' '}
                  Graphics : <span className="graphics">{clientStats?.graphics}</span>{' '}
                </li>
                <li>
                  {' '}
                  RAM : <span className="ram">{clientStats?.ram}</span>{' '}
                </li>
                <li>
                  {' '}
                  OS : <span className="os">{clientStats?.os}</span>{' '}
                </li>
                <li>
                  IP : <span className="ip4">{clientStats?.ip4}</span>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
