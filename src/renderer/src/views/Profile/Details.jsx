import { useCallback, useEffect, useRef, useState } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import defaultAvatar from '../../public/default-avatar.png'
import { useForm } from 'react-hook-form'

export default function Profile() {
  const member = useBoundStore((state) => state.member)
  const updateMember = useBoundStore((state) => state.updateMember)

  const { register, handleSubmit, formState } = useForm({ defaultValues: member })

  const { errors, isSubmitting } = formState
  const onSubmit = (data) => {
    updateMember(member.id, data)
    console.log(errors)
  }

  return (
    <div className="row g-2">
      <div className="col-xl-3">
        <div className="card">
          <div className="card-body text-center">
            <img className="img-account-profile rounded-circle mb-2" src={defaultAvatar} alt="" />
            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
            <button className="btn btn-primary" type="button">
              Upload new image
            </button>
          </div>
        </div>
      </div>
      <div className="col-xl-9">
        <div className="card">
          <div className="card-header">
            Account Details: <i className="bi-person-fill-gear"></i>
            {member.username}
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputFirstName">
                    First name
                  </label>
                  <input
                    className={`form-control ${errors.first_name ? 'is-invalid' : 'is-valid'}`}
                    type="text"
                    placeholder="First name"
                    {...register('first_name', {
                      required: {
                        value: true,
                        message: 'First name is required'
                      },
                      maxLength: 80
                    })}
                  />
                  <div className="invalid-feedback">{errors.first_name?.message}</div>
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputLastName">
                    Last name
                  </label>
                  <input
                    className={`form-control ${errors.last_name ? 'is-invalid' : 'is-valid'}`}
                    type="text"
                    placeholder="Last name"
                    {...register('last_name', {
                      required: {
                        value: true,
                        message: 'last name is required'
                      },
                      maxLength: 20
                    })}
                  />
                  <div className="invalid-feedback">{errors.last_name?.message}</div>
                </div>
              </div>
              <div className="mb-3">
                <label className="small mb-1" htmlFor="inputEmailAddress">
                  Email address
                </label>
                <input
                  className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`}
                  type="text"
                  placeholder="Enter your email address"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPhone">
                    Phone number
                  </label>
                  <input
                    className={`form-control ${errors.phone ? 'is-invalid' : 'is-valid'}`}
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register('phone', {
                      required: true,
                      pattern: '/[0-9]{10}/i',
                      maxLength: 10,
                      minLength: 10
                    })}
                  />
                  <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputBirthday">
                    Birthday
                  </label>
                  <input
                    type="date"
                    placeholder="Birthday"
                    {...register('birthday', { required: true })}
                    className={`form-control ${errors.birthday ? 'is-invalid' : 'is-valid'}`}
                  />
                  <div className="invalid-feedback">{errors.birthday?.message}</div>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
