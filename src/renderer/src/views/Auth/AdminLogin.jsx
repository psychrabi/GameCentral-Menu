import { useCallback, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useBoundStore } from '../../components/stores/BoundStore'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const schema = z.object({
  license: z.string().min(10),
  username: z.string().min(3),
  password: z.string().min(8)
})

export default function AdminLogin() {
  const { center_id, centerLogin, token, checkSession, checkCenterID } = useBoundStore(
    (state) => state
  )

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

  const onSubmit = useCallback(
    async (data) => {
      try {
        await centerLogin(data)
      } catch (error) {
        setError('root', { message: error.message })
      }
    },
    [centerLogin, setError]
  )

  useEffect(() => {
    checkSession()
    checkCenterID()
  }, [checkSession, checkCenterID])

  if (center_id) {
    return <Navigate to="/login" />
  }

  if (!token) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">Please sign in</Typography>

        <TextField
          fullWidth
          variant="outlined"
          {...register('license')}
          label="License"
          error={errors.license}
        />
        <TextField
          fullWidth
          variant="outlined"
          {...register('username')}
          label="Username"
          error={errors.username}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          {...register('password')}
          label="Password"
          error={errors.password}
          margin="normal"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          {...register('remember')}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Signing In..."
        >
          Sign In
        </LoadingButton>
      </form>
    )
  }

  return <Navigate to="/" />
}
