import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
})
export default function MemberLogin() {

  const { memberLogin, center_name } = useBoundStore(state => ({
    memberLogin: state.memberLogin,
    center_name: state.center_name,
  }));

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      username: 'psychrabi',
      password: 'Rabi#123'
    },
    resolver: zodResolver(schema)
  })

  const onSubmit = useCallback(async (data) => {
    try {
      await memberLogin(data)
    } catch (error) {
      setError('root', { message: error.message })
    }
  }, [memberLogin, setError])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mt-4 text-light" id="cafe-name">
        {`Login with your ${center_name} account`}
      </p>
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
      <p>
        <span className="me-2">Don&apos;t have an account yet?</span>
        <Link to="/register" className="text-decoration-none">
          Create account
        </Link>
      </p>
    </form>
  )
}
