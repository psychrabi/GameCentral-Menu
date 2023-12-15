import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { Loading } from '../../components/ui/Loading'
export default function Profile() {
  const { member, loading, updateMember, messages, alert } = useAuthStore()
  const [payload, setPayload] = useState()

  const firstNameInputRef = useRef(null)
  const lastNameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const birthdayInputRef = useRef(null)
  const phoneInputRef = useRef(null)

  const onSubmit = async (ev) => {
    ev.preventDefault()
    updateMember(member.id, payload)
  }

  const handleFirstNameChange = useCallback(() => {
    setPayload((prev) => ({
      ...prev,
      first_name: firstNameInputRef.current.value
    }))
  })
  const handleLastNameChange = useCallback(() => {
    setPayload((prev) => ({
      ...prev,
      last_name: lastNameInputRef.current.value
    }))
  })
  const handleEmailChange = useCallback(() => {
    setPayload((prev) => ({
      ...prev,
      email: emailInputRef.current.value
    }))
  })
  const handleBirthdayChange = useCallback(() => {
    setPayload((prev) => ({
      ...prev,
      birthday: birthdayInputRef.current.value
    }))
  })
  const handlePhoneChange = useCallback(() => {
    setPayload((prev) => ({
      ...prev,
      phone: phoneInputRef.current.value
    }))
  })

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      first_name: member?.first_name,
      last_name: member?.last_name,
      birthday: member?.birthday,
      phone: member?.phone,
      email: member?.email
    }))

    firstNameInputRef.current.value = member?.first_name
    lastNameInputRef.current.value = member?.last_name || ''
    emailInputRef.current.value = member?.email || ''
    birthdayInputRef.current.value = member?.birthday || '1990-01-01'
    phoneInputRef.current.value = member?.phone || '9800000000'
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className="row">
      <div className="col-xl-4">
        <div className="card mb-4 mb-xl-0">
          <div className="card-header">Profile Picture</div>
          <div className="card-body text-center">
            <img
              className="img-account-profile rounded-circle mb-2"
              src="http://bootdey.com/img/Content/avatar/avatar1.png"
              alt=""
            />
            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
            <button className="btn btn-primary" type="button">
              Upload new image
            </button>
          </div>
        </div>
      </div>
      <div className="col-xl-8">
        <div className="card mb-4">
          <div className="card-header">
            Account Details: <i className="bi-person-fill-gear"></i>
            {member.username}
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputFirstName">
                    First name
                  </label>
                  <input
                    className="form-control"
                    id="inputFirstName"
                    type="text"
                    placeholder="Enter your first name"
                    ref={firstNameInputRef}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputLastName">
                    Last name
                  </label>
                  <input
                    className="form-control"
                    id="inputLastName"
                    type="text"
                    placeholder="Enter your last name"
                    ref={lastNameInputRef}
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="inputEmailAddress">
                  Email address
                </label>
                <input
                  className="form-control"
                  id="inputEmailAddress"
                  type="email"
                  placeholder="Enter your email address"
                  ref={emailInputRef}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPhone">
                    Phone number
                  </label>
                  <input
                    className="form-control"
                    id="inputPhone"
                    type="tel"
                    placeholder="Enter your phone number"
                    ref={phoneInputRef}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputBirthday">
                    Birthday
                  </label>
                  <input
                    className="form-control"
                    id="inputBirthday"
                    type="date"
                    name="birthday"
                    placeholder="Enter your birthday"
                    ref={birthdayInputRef}
                    onChange={handleBirthdayChange}
                  />
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
