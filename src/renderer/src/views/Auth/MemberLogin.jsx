import { useEffect, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Notifications from '../../components/Notifications'
import logo from '../../public/logo512.png'
import background from '../../public/login.png'
import { useAuthStore } from '../../components/stores/AuthStore'
import ClientStats from '../../components/ui/ClientStats'
import { VideoBackground } from '../../components/ui/VideoBackground'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import { ImageBackground } from '../../components/ui/ImageBackground'
export default function MemberLogin() {
  const { token, authenticate, checkSession, loading, error, center_id } = useAuthStore()
  const loginRef = useRef()
  const passwordRef = useRef()
  const center_name = 'Hak3rz Juction'

  // const { setNotifications, notifications } = useStateContext()

  function onSubmit(ev) {
    ev.preventDefault()
    authenticate(loginRef.current.value, passwordRef.current.value)
  }

  // if (!localStorage.getItem('center_id')) {
  //   return <Navigate to="/adminMemberLogin" />
  // }

  useEffect(() => {
    checkSession()
  }, [])

  if (!center_id) {
    return <Navigate to="/adminLogin" />
  } else if (!token) {
    return (
      <>
        {/* <VideoBackground /> */}
        <div style={{ background: `url(${background})`, backgroundSize: 'cover' }}>
          <div className="login">
            <main className="px-4">
              <div className="form-signin position-relative">
                <form onSubmit={onSubmit} autoComplete="off" className={'mb-3 px-5 mx-4 text-secondary'}>
                  <div>
                    <img src={logo} alt="" style={{ width: '4rem', height: '4rem' }} />
                  </div>
                  <p className="mt-4 text-light" id="cafe-name">
                    {`Login with your ${center_name} account`}{' '}
                  </p>

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
                  <Link className="btn btn-link mt-3" to="/forgot">
                    Forgot password?
                  </Link>
                  <div className="my-3 text-uppercase">Continue with</div>
                  <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-secondary">
                      <i className="bi bi-facebook me-2"></i>
                      Facebook
                    </button>
                    <button className="btn btn-secondary">
                      <i className="bi bi-google me-2"></i>
                      Google
                    </button>
                    <button className="btn btn-secondary">
                      <i className="bi bi-apple me-2"></i>
                      Apple
                    </button>
                  </div>
                  <p>
                    Don't have an account yet? <Link to="/register">Create account</Link>
                  </p>
                </form>
                <div className="py-2 bg-dark text-light position-absolute bottom-0 start-0 end-0">
                  <span className="fs-3 ">PC01</span>
                </div>
              </div>
            </main>
            {/* {error ? <Notifications notifications={error} /> : ''} */}
            {/* <ClientStats /> */}
          </div>
        </div>
      </>
    )
  } else {
    return <Navigate to="/" />
  }
}
