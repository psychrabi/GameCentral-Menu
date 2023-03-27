import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../components/stores/AuthStore'

// import { ImageBackground } from '../../components/ui/ImageBackground'
export default function MemberLogin() {
  const { authenticate, loading } = useAuthStore()
  const loginRef = useRef()
  const passwordRef = useRef()
  const center_name = 'Hak3rz Juction'
  const oauth = false

  function onSubmit(ev) {
    ev.preventDefault()
    authenticate(loginRef.current.value, passwordRef.current.value)
  }

  return (
    <>
      <form autoComplete="off" onSubmit={onSubmit}>
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
        <Link className="btn btn-link mt-3" to="/forgot-password">
          Forgot password?
        </Link>
        <div style={{ display: oauth ? 'block' : 'none' }}>
          <div className="my-3 text-uppercase">Continue with</div>
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary">
              <i className="bi bi-facebook me-2"></i>
              Facebook
            </button>
            <button className="btn btn-danger">
              <i className="bi bi-google me-2"></i>
              Google
            </button>
            <button className="btn btn-light">
              <i className="bi bi-apple me-2"></i>
              Apple
            </button>
          </div>
        </div>

        <p>
          <span className="me-2">Don&apos;t have an account yet?</span>
          <Link to="/register" className="text-decoration-none">
            Create account
          </Link>
        </p>
      </form>
    </>
  )
}
