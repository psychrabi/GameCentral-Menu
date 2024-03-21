import { useCallback, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
export default function AdminLogin() {
  const {
    center_id,
    authenticateAdmin,
    loading,
    token,
    checkSession,
    checkCenterID,
    error,
  } = useBoundStore((state) => ({
    center_id: state.center_id,
    authenticateAdmin: state.authenticateAdmin,
    loading: state.loading,
    token: state.token,
    checkSession: state.checkSession,
    checkCenterID: state.checkCenterID,
    error: state.error,
  }));

  const licenseRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const onSubmit = useCallback((ev) => {
    ev.preventDefault();
    authenticateAdmin(
      licenseRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value
    );
  }, [authenticateAdmin]);

  useEffect(() => {
    checkSession();
    checkCenterID();
  }, [checkSession, checkCenterID]);

  if (center_id) {
    return <Navigate to="/login" />;
  }

  if (!token) {
    return (
      <form onSubmit={onSubmit} autoComplete="off" className="mb-3">
        {/* Form content */}
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
    );
  }

  return <Navigate to="/" />;
}
