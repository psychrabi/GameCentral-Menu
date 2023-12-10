import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../components/stores/AuthStore'

export default function MemberLogin() {
  const { authenticate, loading, center_name } = useAuthStore()
  const loginRef = useRef()
  const passwordRef = useRef()

  function onSubmit(ev) {
    ev.preventDefault()
    authenticate(loginRef.current.value, passwordRef.current.value)
  }

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <p className="mt-4 text-light" id="cafe-name">
        {`Login with your ${center_name} account`}
      </p>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          ref={loginRef}
          id="login-member"
          placeholder="Username or Email address"
          autoFocus
        />
        <label htmlFor="login-member">Username or Email address</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" ref={passwordRef} placeholder="Password" />
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
      <p>
        <span className="me-2">Don&apos;t have an account yet?</span>
        <Link to="/register" className="text-decoration-none">
          Create account
        </Link>
      </p>
    </form>
  )
}
