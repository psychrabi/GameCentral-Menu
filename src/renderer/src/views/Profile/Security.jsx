import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { TextField } from '@mui/material'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useBoundStore } from '../../components/stores/BoundStore'

const schema = z
  .object({
    current_password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    password_confirmation: z.string().min(6)
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation']
  })

export default function Security() {
  const member = useBoundStore((state) => state.member)
  const memberUpdate = useBoundStore((state) => state.memberUpdate)

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
        await memberUpdate(member.id, data)
      } catch (error) {
        setError('root', { message: error.message })
      }
    },
    [memberUpdate, setError]
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="password"
          fullWidth
          {...register('current_password')}
          label="Current Password"
          error={errors.current_password}
          sx={{ mb: 1 }}
        />
        <TextField
          type="password"
          fullWidth
          {...register('password')}
          label="New Password"
          error={errors.password}
          sx={{ mb: 1 }}
        />
        <TextField
          type="password"
          fullWidth
          {...register('password_confirmation')}
          label="Confirm Password"
          error={errors.password_confirmation}
        />
        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Updating Password..."
          sx={{ my: 1 }}
        >
          Update Password
        </LoadingButton>
      </form>
    </>
  )
}
