import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Divider, Link, TextField, Typography } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useBoundStore } from '../../components/stores/BoundStore'

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
})
export default function MemberLogin() {
  const navigate = useNavigate()
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
      username: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD
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

  useEffect(() => {
    if (!center_name) {
      navigate('/admin')
    }
  }, [])

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
      <Typography variant="body2" margin={2}>
        <Link component={RouterLink} to="/forgot-password" underline="none">
          Forgot password?
        </Link>
      </Typography>
      <Divider sx={{ my: 2 }}> OR </Divider>
      <Typography variant="body2" margin={2}>
        Don&apos;t have an account yet? &nbsp;
        <Link component={RouterLink} to="/register" underline="none">
          Create account
        </Link>
      </Typography>
    </form>
  )
}
