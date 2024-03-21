import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useBoundStore } from '../../components/stores/BoundStore'

export default function MemberLogin() {
  const authenticate = useBoundStore((state) => state.authenticate)
  const loading = useBoundStore((state) => state.loading)
  const center_name = useBoundStore((state) => state.center_name)

  const loginRef = useRef()
  const passwordRef = useRef()

 
  function onSubmit(ev) {
    ev.preventDefault()
    loginRef.current.value = 'psychrabi'
    passwordRef.current.value = 'Rabi#123'
    authenticate(loginRef.current.value, passwordRef.current.value)
  }

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <p className="mt-4 text-light" id="cafe-name">
        {`Login with your ${center_name} account`}
      </p>

      <Form.Floating>
        <Form.Control
          id="login-member"
          type="text"
          placeholder="Username"
          ref={loginRef}
          autoFocus
        />
        <label htmlFor="login-member">Username</label>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control id="password" type="password" placeholder="Password" ref={passwordRef} />
        <label htmlFor="password">Password</label>
      </Form.Floating>

      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="light"
              />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </div>
      <p>
        <span className="me-2">Don&apos;t have an account yet?</span>
        <Link to="/register" className="text-decoration-none">
          Create account
        </Link>
      </p>
    </form>
  )
}
