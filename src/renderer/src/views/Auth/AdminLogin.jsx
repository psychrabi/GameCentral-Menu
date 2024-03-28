import { useCallback, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { Link } from 'react-router-dom'

const schema = z.object({
  license: z.string().min(10),
  username: z.string().min(3),
  password: z.string().min(8)
})

export default function AdminLogin() {
  const {
    center_id,
    centerLogin,
    token,
    checkSession,
    checkCenterID,
  } = useBoundStore((state) => state);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      license: '9779860240841',
      username: 'admin',
      password: 'Rabi#123'
    },
    resolver: zodResolver(schema)
  })

  const onSubmit = useCallback(async (data) => {
    try {
      await centerLogin(data)
    } catch (error) {
      setError('root', { message: error.message })
    }
  }, [centerLogin, setError])

  useEffect(() => {
    checkSession();
    checkCenterID();
  }, [checkSession, checkCenterID]);

  if (center_id) {
    return <Navigate to="/login" />;
  }

  if (!token) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>

        <h4 className="h5  fw-normal text-light">Please sign in</h4>
        <div className="form-floating">
          <input
            type="text"
            {...register('license')}
            className={`form-control ${errors.license ? 'is-invalid' : ''}`}
            id="license"
            placeholder="License"
          />
          <label htmlFor="license">License</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            {...register('username')}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="email"
            placeholder="Username or Email address"
          />
          <label htmlFor="email">Username or Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            id="password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-check form-check-inline text-lg text-light mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            {...register('remember')}
            id="remember"
            defaultChecked={true}
          />
          <label className="form-check-label" htmlFor="remember">
            Remember me
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary mb-2"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
        <Link to="/register" className="text-light">
          Create an account for GameCentral Menu
        </Link>
      </form>
    );
  }

  return <Navigate to="/" />;
}
