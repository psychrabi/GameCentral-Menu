import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
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
      <p className="mt-4" id="cafe-name">
        {`Login with your ${center_name} account`}
      </p>
      <TextField
        fullWidth
        variant="filled"
        {...register('username')}
        label="Username"
        error={errors.username}
      />
      <TextField
        fullWidth
        variant="filled"
        {...register('password')}
        label="Password"
        error={errors.password}
        margin="normal"
      />
      <LoadingButton
        variant="contained"
        className="w-100 btn btn-lg btn-primary mb-2"
        type="submit"
        loading={isSubmitting}
        loadingIndicator="Signing In..."
      >
        Sign In
      </LoadingButton>
      <p>
        <span className="me-2">Don&apos;t have an account yet?</span>
        <Link to="/register">Create account</Link>
      </p>
    </form>
  )
}
