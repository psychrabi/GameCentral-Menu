import { useCallback, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const schema = z
  .object({
    email: z.string().email({ message: 'Email is not valid' }),
    username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    password_confirmation: z.string().min(6)
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation']
  })

export default function Register() {
  const navigate = useNavigate()
  const { memberSignup, center_name, error } = useBoundStore((state) => ({
    memberSignup: state.memberSignup,
    center_name: state.center_name,
    error: state.error
  }))

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: 'rabistha@ymail.com',
      username: 'rabistha',
      password: 'Rabi#123',
      password_confirmation: 'Rabi#123'
    },
    resolver: zodResolver(schema)
  })

  const onSubmit = useCallback(
    async (data) => {
      try {
        await memberSignup(data)
        navigate('/login')
      } catch (error) {
        setError('root', { message: error.message })
      }
    },
    [memberSignup, setError]
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" marginBottom={2} id="cafe-name">
          {`Register your ${center_name} account`}
        </Typography>
        <TextField
          fullWidth
          {...register('username')}
          label="Username"
          error={errors.username}
          margin="dense"
        />
        <TextField
          fullWidth
          {...register('email')}
          label="Email address"
          error={errors.email}
          margin="dense"
        />
        <TextField
          fullWidth
          {...register('password')}
          label="Password"
          error={errors.password}
          margin="dense"
        />
        <TextField
          fullWidth
          {...register('password_confirmation')}
          label="Confirm Password"
          error={errors.password_confirmation}
          margin="dense"
        />

        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Signing up..."
          sx={{ my: 1 }}
        >
          Sign Up
        </LoadingButton>

        <Typography variant="body2">
          <span className="me-2">Don't have an account yet?</span>
          <Link component={RouterLink} to="/login" underline="none">
            Sign In
          </Link>
        </Typography>
      </form>
    </>
  )
}
