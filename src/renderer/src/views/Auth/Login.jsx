import { useRef, useState } from 'react'
import axiosClient from '../../lib/axios-client'
import { useStateContext } from '../../components/contexts/ContextProvider'
import { Loading } from '../../components/ui/Loading'
import { Navigate } from 'react-router-dom'
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
  const [errors, setErrors] = useState(null)

  const { setToken, setType } = useStateContext()

  // const [clientStats, setClientStats] = useState({
  //   hostname: null,
  //   cpu: null,
  //   graphics: null,
  //   ram: null,
  //   os: null,
  //   ip4: null
  // })

  // const setSystemInfo = (info) => {
  //   setClientStats({
  //     hostname: info.osInfo.hostname,
  //     cpu: info.cpu.manufacturer + ' ' + info.cpu.brand,
  //     graphics: info.graphics.controllers[0].model,
  //     ram: (info.mem.total / (1024 * 1024 * 1024)).toFixed(2) + 'GB',
  //     os: info.osInfo.distro + ' build ' + info.osInfo.build,
  //     ip4: info.networkInterfaces[0].ip4
  //   })
  // }

  function onSubmit(ev) {
    ev.preventDefault()
    const payload = {
      username: loginRef.current.value,
      password: passwordRef.current.value
    }
    setErrors(null)
    setLoading(true)
    axiosClient
      .post('/members/login', payload)
      .then(({ data }) => {
        localStorage.setItem('member', JSON.stringify(data.member))

        const start_time = Date.now()
        const sessionType =
          data.member.balance > 0 || data.member.bonus_balance > 0 ? 'balance' : 'credit'
        if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
          setErrors('Not enough balance. Please top up your account.')
          return
        }
        if (data.member.credit > 30) {
          setErrors(`You have ${data.member.credit} credit to be paid. Please pay it first.`)
          return
        }
        localStorage.setItem('start_time', start_time)
        localStorage.setItem('session', JSON.stringify(data.session))
        localStorage.setItem('sessionType', sessionType)

        setToken(data.token)
        setType(data.type)
        setLoading(false)
      })
      .catch((err) => {
        const response = err.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
          } else {
            setErrors({
              username: [response.data.message]
            })
          }
        }
      })
  }

  // useEffect(() => {
  //   if (!localStorage.getItem('systemInfo')) {
  //     setLoading(true)
  //     window.ipcRender
  //       .invoke('request-system-info', 'System Information Requested')
  //       .then((result) => {
  //         localStorage.setItem('systemInfo', JSON.stringify(result))
  //         setSystemInfo(result)
  //         setLoading(false) // Stop loading
  //       })
  //   } else {
  //     const SystemInfo = JSON.parse(localStorage.getItem('systemInfo'))
  //     setSystemInfo(SystemInfo)
  //   }
  // }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="login-signup-form animated fadeInDown">
          <div className="form">
            <div className="login">
              <h2 className="display-1 fw-normal text-light position-absolute top-0 start-0 mt-5 ms-5 hostname">
                {/* {clientStats.hostname} */}
              </h2>

              <div>
                <video className="video url-video" autoPlay={true} muted loop>
                  <source type="video/mp4" src={video} id="url-video" />
                </video>
              </div>

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
                  <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Sign in
                  </button>
                </form>
                {errors && (
                  <div className="toast-container top-0 end-0 p-3">
                    <div
                      className="toast fade show"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      data-bs-autohide={'true'}
                      data-bs-delay="2000"
                    >
                      <div className="toast-body">
                        {Object.keys(errors).map((key) => (
                          <span key={key}>{errors[key][0]}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </main>

              {/* <footer className="position-absolute bottom-0 mb-5 me-5 end-0 text-light">
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
              </footer> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
