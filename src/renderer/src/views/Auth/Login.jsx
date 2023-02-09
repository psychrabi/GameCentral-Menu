import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useStateContext } from '../../components/contexts/ContextProvider'
import Notifications from '../../components/Notifications'
import axiosClient from '../../lib/axios-client'
import logo from '../../public/logo512.png'
import video from '../../public/video.mp4'

export default function Login() {
  const { token } = useStateContext()

  if (token) {
    return <Navigate to="/" />
  }

  const [loading, setLoading] = useState(false)

  const loginRef = useRef()
  const passwordRef = useRef()

  const { setToken, setType, setNotifications, notifications, setMember } = useStateContext()

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
    const payload = {
      username: loginRef.current.value,
      password: passwordRef.current.value
    }
    setNotifications(null)
    setLoading(true)
    axiosClient
      .post('/members/login', payload)
      .then(({ data }) => {
        localStorage.setItem('member', JSON.stringify(data.member))
        setMember(data.member)
        const start_time = Date.now()
        const sessionType =
          data.member.balance > 0 || data.member.bonus_balance > 0 ? 'balance' : 'credit'
        if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
          setNotifications('Not enough balance. Please top up your account.')
          return
        }
        if (data.member.credit > 30) {
          setNotifications(`You have ${data.member.credit} credit to be paid. Please pay it first.`)
          setLoading(false)
          return
        }
        localStorage.setItem('start_time', start_time)
        localStorage.setItem('session', JSON.stringify(data.session))
        localStorage.setItem('sessionType', sessionType)
        // console.log(data.settings)
        setToken(data.token)
        setType(data.type)
      })
      .catch((err) => {
        setLoading(false)
        const response = err.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setNotifications(response.data.errors)
          } else {
            setNotifications({
              username: [response.data.message]
            })
          }
        }
      })
  }

  useEffect(() => {
    if (!clientStats) {
      setLoading(true)
      window.api.getSystemInfo.then((result) => {
        localStorage.setItem('systemInfo', JSON.stringify(result))
        setSystemInfo(result)
        setLoading(false) // Stop loading
      })
    } else {
      const SystemInfo = JSON.parse(localStorage.getItem('systemInfo'))
      setSystemInfo(SystemInfo)
    }
  }, [])

  return (
    <>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <div className="login">
            <h2 className="display-1 fw-normal text-light position-absolute top-0 start-0 mt-5 ms-5 hostname">
              {clientStats.hostname ?? 'GameCenter Menu Client'}
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
                  CPU : <span className="cpu">{clientStats.cpu}</span>
                </li>
                <li>
                  {' '}
                  Graphics : <span className="graphics">{clientStats.graphics}</span>{' '}
                </li>
                <li>
                  {' '}
                  RAM : <span className="ram">{clientStats.ram}</span>{' '}
                </li>
                <li>
                  {' '}
                  OS : <span className="os">{clientStats.os}</span>{' '}
                </li>
                <li>
                  IP : <span className="ip4">{clientStats.ip4}</span>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
