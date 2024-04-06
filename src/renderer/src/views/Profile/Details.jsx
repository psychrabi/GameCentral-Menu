import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Box, Card, CardContent, CardHeader, TextField } from '@mui/material'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useBoundStore } from '../../components/stores/BoundStore'

const schema = z.object({
  first_name: z.string().min(3, { message: 'First name must be at least 3 characters' }),
  last_name: z.string().min(3, { message: 'Last name must be at least 3 characters' }),
  email: z.string().email({ message: 'Email is not valid' }),
  birthday: z.string().min(2),
  phone: z.string().min(8)
})

export default function Profile() {
  const member = useBoundStore((state) => state.member)
  const memberUpdate = useBoundStore((state) => state.memberUpdate)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: member,
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
    <Box>
      {/* TODO: Add image upload */}
      {/* <div className="col-xl-3">
        <div className="card">
          <div className="card-body text-center">
            <img className="img-account-profile rounded-circle mb-2" src={defaultAvatar} alt="" />
            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
            <button className="btn btn-primary" type="button">
              Upload new image
            </button>
          </div>
        </div>
      </div> */}
      <Card>
        <CardHeader title={`Account Details: ${member.username}`} sx={{ bgcolor: 'black' }} />

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'grid', gridAutoColumns: '2fr', gap: 1 }}>
              <TextField
                {...register('first_name', {
                  required: {
                    value: true,
                    message: 'First name is required'
                  },
                  maxLength: 80
                })}
                label="First name"
                error={errors.first_name}
                margin="dense"
              />
              <TextField
                {...register('last_name', {
                  required: {
                    value: true,
                    message: 'last name is required'
                  },
                  maxLength: 20
                })}
                label="Last name"
                error={errors.last_name}
                margin="dense"
              />
              <TextField
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                label="Email address"
                error={errors.email}
                margin="dense"
              />
              <TextField
                {...register('phone', {
                  required: true,
                  pattern: '/[0-9]{10}/i',
                  maxLength: 10,
                  minLength: 10
                })}
                label="Phone"
                error={errors.phone}
                margin="dense"
              />
              <TextField
                {...register('birthday', { required: true })}
                label="Birthday"
                error={errors.birthday}
                margin="dense"
              />

              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
                loadingIndicator="Saving changes..."
              >
                Save Changes
              </LoadingButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
