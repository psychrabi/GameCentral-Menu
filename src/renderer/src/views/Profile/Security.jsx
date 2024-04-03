import { useCallback, useState } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
        <div className="mb-3">
          <label className="small mb-1" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            className={`form-control ${errors.current_password ? 'is-invalid' : 'is-valid'}`}
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            {...register('current_password')}
          />
        </div>
        <div className="mb-3">
          <label className="small mb-1" htmlFor="newPassword">
            New Password
          </label>
          <input
            className={`form-control ${errors.password ? 'is-invalid' : 'is-valid'}`}
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            {...register('password')}
          />
        </div>
        <div className="mb-3">
          <label className="small mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={`form-control ${errors.password_confirmation ? 'is-invalid' : 'is-valid'}`}
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            {...register('password_confirmation')}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Updating password
            </>
          ) : (
            'Update password'
          )}
        </button>
      </form>
    </>
  )
}
