import { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../components/stores/AuthStore'
import { Link } from 'react-router-dom'

export default function Register() {
  const { token, authenticateAdmin, checkSession, loading, error, checkCenterID } = useAuthStore()

  const emailRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirm_passwordRef = useRef()
  const center_name = 'Hak3rz Juction'

  function onSubmit(ev) {
    ev.preventDefault()
    authenticateAdmin(usernameRef.current.value, passwordRef.current.value)
  }
  if (error) {
    console.log(error)
  }

  useEffect(() => {
    checkSession()
    checkCenterID()
  }, [])

  if (!token) {
    return (
      <>
        <form onSubmit={onSubmit} autoComplete="off" className={'mb-3'}>
          <p className="mt-4 text-light" id="cafe-name">
            {`Register your ${center_name} account`}
          </p>{' '}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              ref={usernameRef}
              id="username"
              placeholder="Username"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              ref={emailRef}
              id="email"
              placeholder="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              ref={passwordRef}
              placeholder="Password"
              id="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              ref={confirm_passwordRef}
              placeholder="Password"
              id="confirm_password"
            />
            <label htmlFor="confirm_password">Confirm Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          <p>
            <span className="me-2">Already have an account?</span>
            <Link to="/login" className="text-decoration-none">
              Sign In
            </Link>
          </p>
        </form>
      </>
    )
  } else {
    return <Navigate to="/" />
  }
}
