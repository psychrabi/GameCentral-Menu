import { useEffect } from 'react'
import { useStateContext } from '../../components/contexts/ContextProvider'
import axiosClient from '../../lib/axios-client'

export default function Profile() {
  const { setNotifications, setTitle, member, setMember } = useStateContext()

  useEffect(() => {
    setTitle('Profile - Update Profile')
    axiosClient
      .get('/member')
      .then(({ data }) => {
        setMember(data)
      })
      .catch((errors) => {
        console.log(errors)
      })
  }, [])

  function onSubmit(ev) {
    ev.preventDefault()
    axiosClient
      .put(`/members/${member.id}`, member)
      .then(() => {
        setNotifications('Your profile was updated successfully.')
      })
      .catch((err) => {
        const response = err.response
        if (response && response.status === 422) {
          setNotifications(response.data.errors)
        }
      })
  }

  return (
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
          <div className="card-header">Account Details</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="small mb-1" htmlFor="inputUsername">
                  Username (how your name will appear to other users on the site)
                </label>
                <input
                  className="form-control"
                  id="inputUsername"
                  type="text"
                  placeholder="Enter your username"
                  value={member?.username}
                  onChange={(ev) => setMember({ ...member, username: ev.target.value })}
                  disabled
                />
              </div>
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
                    value={member?.first_name}
                    onChange={(ev) => setMember({ ...member, first_name: ev.target.value })}
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
                    value={member?.last_name}
                    onChange={(ev) => setMember({ ...member, last_name: ev.target.value })}
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
                  value={member?.email}
                  onChange={(ev) => setMember({ ...member, email: ev.target.value })}
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
                    value={member?.phone ?? ''}
                    onChange={(ev) => setMember({ ...member, phone: ev.target.value })}
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
                    value={member?.birthday ?? "1990-11-11"}
                    onChange={(ev) => setMember({ ...member, birthday: ev.target.value })}
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
