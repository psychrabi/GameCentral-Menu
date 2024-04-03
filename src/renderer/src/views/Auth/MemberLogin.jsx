import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCallback } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import { TextField, Typography, Link } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
})
export default function MemberLogin() {
  const { memberLogin, center_name } = useBoundStore((state) => ({
    memberLogin: state.memberLogin,
    center_name: state.center_name
  }))

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

  const onSubmit = useCallback(
    async (data) => {
      try {
        await memberLogin(data)
      } catch (error) {
        setError('root', { message: error.message })
      }
    },
    [memberLogin, setError]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="body1" marginBottom={2} id="cafe-name">
        {`Login with your ${center_name} account`}
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
        variant="outlined"
        {...register('password')}
        label="Password"
        error={errors.password}
        margin="normal"
      />
      <LoadingButton
        variant="contained"
        fullWidth
        size="large"
        type="submit"
        loading={isSubmitting}
        loadingIndicator="Signing In..."
        sx={{ my: 1 }}
      >
        Sign In
      </LoadingButton>
      <Typography variant="body2">
        <span className="me-2">Don&apos;t have an account yet?</span>
        <Link component={RouterLink} to="/register" underline="none">
          Create account
        </Link>
      </Typography>
    </form>
  )
}
