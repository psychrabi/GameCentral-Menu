import { useCallback, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { z } from 'zod'
import { Link, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const schema = z.object({
  username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
  email: z.string().email({ message: 'Email is not valid' })
})

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { memberSignup, center_name } = useBoundStore((state) => ({
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
    resolver: zodResolver(schema)
  })

  const onSubmit = useCallback(
    async (data) => {
      try {
        await memberSignup(data)
        navigate('/')
      } catch (error) {
        setError('root', { message: error.message })
      }
    },
    [memberSignup, setError]
  )

  useEffect(() => {
    if (!center_name) {
      navigate('/admin')
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" marginBottom={2} id="cafe-name">
          {`Reset your ${center_name} account password`}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          {...register('username')}
          label="Username"
          error={errors.username}
        />

        <TextField
          fullWidth
          {...register('email')}
          label="Email address"
          error={errors.email}
          margin="normal"
        />

        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Sending recover email..."
          sx={{ my: 1 }}
        >
          Reset Password
        </LoadingButton>

        <Typography variant="body2">
          Remember your password ?&nbsp;
          <Link component={RouterLink} to="/" underline="none">
            Sign In
          </Link>
        </Typography>
      </form>
    </>
  )
}
