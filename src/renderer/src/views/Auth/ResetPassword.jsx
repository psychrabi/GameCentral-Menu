import { useEffect, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'

export default function ForgotPassword() {
  const forgotPassword = useBoundStore((state) => state.forgotPassword)
  const loading = useBoundStore((state) => state.loading)
  const token = useBoundStore((state) => state.token)
  const checkSession = useBoundStore((state) => state.checkSession)
  const checkCenterID = useBoundStore((state) => state.checkCenterID)
  const center_id = useBoundStore((state) => state.center_id)
  const error = useBoundStore((state) => state.error)

  const usernameRef = useRef()
  const emailRef = useRef()
  const center_name = 'Hak3rz Juction'

  function onSubmit(ev) {
    ev.preventDefault()
    forgotPassword(usernameRef.current.value, emailRef.current.value)
  }
  if (error) {
    console.log(error)
  }

  useEffect(() => {
    checkSession()
    checkCenterID()
  }, [])
  if (center_id) {
    return <Navigate to="/login" />
  } else if (!token) {
    return (
      <>
        <form onSubmit={onSubmit} autoComplete="off" className={'mb-3'}>
          <p className="mt-4 text-light" id="cafe-name">
            {`Reset your ${center_name} account password`}
          </p>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              ref={usernameRef}
              id="login-user"
              placeholder="License"
            />
            <label htmlFor="login-user">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              ref={emailRef}
              id="email"
              placeholder="Email address"
            />
            <label htmlFor="login-user">Email Address</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sending recover email...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
          <p className="mt-3">
            <Link to="/login" className="text-decoration-none">
              Go back to login
            </Link>
          </p>
        </form>
      </>
    )
  } else {
    return <Navigate to="/" />
  }
}
