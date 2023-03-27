import { useEffect, useState } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { Loading } from '../../components/ui/Loading'

export default function Profile() {
  const { member, error, loading, updateMember, token } = useAuthStore()
  const [updatedMember, setUpdatedMember] = useState(member)

  useEffect(() => {
    console.log(updatedMember)
  }, [updatedMember])

  function onSubmit(ev) {
    ev.preventDefault()
    updateMember(member.id, token, updatedMember)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
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
                  value={updatedMember.username}
                  readOnly
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
                    value={updatedMember?.first_name}
                    onChange={(ev) =>
                      setUpdatedMember({ ...updatedMember, first_name: ev.target.value })
                    }
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
                    value={updatedMember?.last_name}
                    onChange={(ev) =>
                      setUpdatedMember({ ...updatedMember, last_name: ev.target.value })
                    }
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
                  value={updatedMember?.email}
                  onChange={(ev) => setUpdatedMember({ ...updatedMember, email: ev.target.value })}
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
                    value={updatedMember?.phone}
                    onChange={(ev) =>
                      setUpdatedMember({ ...updatedMember, phone: ev.target.value })
                    }
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
                    value={updatedMember.birthday}
                    onChange={(ev) =>
                      setUpdatedMember({ ...updatedMember, birthday: ev.target.value })
                    }
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
