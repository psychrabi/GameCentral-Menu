import { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
// import { ImageBackground } from '../../components/ui/ImageBackground'
export default function AdminLogin() {
  const center_id = useBoundStore((state) => state.center_id)
  const authenticateAdmin = useBoundStore((state) => state.authenticateAdmin)
  const loading = useBoundStore((state) => state.loading)
  const token = useBoundStore((state) => state.token)
  const checkSession = useBoundStore((state) => state.checkSession)
  const checkCenterID = useBoundStore((state) => state.checkCenterID)
  const error = useBoundStore((state) => state.error)

  const licenseRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()

  function onSubmit(ev) {
    ev.preventDefault()
    authenticateAdmin(
      licenseRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value
    )
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
      <form onSubmit={onSubmit} autoComplete="off" className={'mb-3'}>
        <h4 className="h4 mb-3 fw-normal text-light">Please sign in</h4>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            ref={licenseRef}
            id="login-user"
            placeholder="License"
          />
          <label htmlFor="login-user">License</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            ref={usernameRef}
            id="email"
            placeholder="Username or Email address"
          />
          <label htmlFor="login-user">Username or Email</label>
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
    )
  } else {
    return <Navigate to="/" />
  }
}
