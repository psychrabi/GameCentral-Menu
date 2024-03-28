import { useCallback, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email({ message: 'Email is not valid' }),
  username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  password_confirmation: z.string().min(6)
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export default function Register() {
  const navigate = useNavigate()
  const {
    memberSignup,
    center_name,
    error,
  } = useBoundStore(state => ({
    memberSignup: state.memberSignup,
    center_name: state.center_name,
    error: state.error,
  }));

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { email: 'rabistha@ymail.com', username: 'rabistha', password: 'Rabi#123', password_confirmation: 'Rabi#123' },
    resolver: zodResolver(schema)
  })

  const onSubmit = useCallback(async (data) => {
    try {
      await memberSignup(data)
      navigate('/login')

    } catch (error) {
      setError('root', { message: error.message })
    }
  }, [memberSignup, setError])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className={'mb-3'}>
        <p className="mt-4 text-light" id="cafe-name">
          {`Register your ${center_name} account`}
        </p>{' '}
        <div className="form-floating">
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}

            {...register('username')}
            id="username"
            placeholder="Username"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email')}
            id="email"
            placeholder="email"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}

            {...register('password')}
            placeholder="Password"
            id="password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}

            {...register('password_confirmation')}
            placeholder="Password"
            id="password_confirmation"
          />
          <label htmlFor="password_confirmation">Confirm Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
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
}

