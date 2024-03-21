import { useCallback, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { Link } from 'react-router-dom'

export default function Register() {
  const {
    registerMember,
    center_name,
    loading,
    token,
    checkSession,
    checkCenterID,
    error,
    setMessages,
    setType
  } = useBoundStore(state => ({
    registerMember: state.registerMember,
    center_name: state.center_name,
    loading: state.loading,
    token: state.token,
    checkSession: state.checkSession,
    checkCenterID: state.checkCenterID,
    error: state.error,
    setMessages: state.setMessages,
    setType: state.setType,
  }));

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirm_passwordRef = useRef();

  const onSubmit = useCallback((ev) => {
    ev.preventDefault();
    registerMember(
      usernameRef.current.value,
      passwordRef.current.value,
      confirm_passwordRef.current.value,
      emailRef.current.value
    );
  }, [registerMember]);

  useEffect(() => {
    setMessages('');
    setType('');
    checkSession();
    checkCenterID();
  }, [setMessages, setType, checkSession, checkCenterID]);

  if (error) {
    console.error(error);
  }

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
    );
  } else {
    return <Navigate to="/" />;
  }
}
