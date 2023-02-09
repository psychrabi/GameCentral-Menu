import { useEffect } from 'react'
import { useStateContext } from '../../components/contexts/ContextProvider'

export default function Security() {
  const { setTitle } = useStateContext()

  useEffect(() => {
    setTitle('Profile - Change Password')
  }, [])
  return (
    <>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card mb-4">
            <div className="card-header">Change Password</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <input
                    className="form-control"
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    onChange={(ev) => setMember({ ...member, current_password: ev.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    className="form-control"
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    onChange={(ev) => setMember({ ...member, password: ev.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="form-control"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    onChange={(ev) =>
                      setMember({ ...member, password_confirmation: ev.target.value })
                    }
                  />
                </div>
                <button className="btn btn-primary" type="button">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-4">

          <div className="card mb-4">
            <div className="card-header">Delete Account</div>
            <div className="card-body">
              <p>
                Deleting your account is a permanent action and cannot be undone. If you are sure
                you want to delete your account, select the button below.
              </p>
              <button className="btn btn-danger-soft text-danger" type="submit">
                I understand, delete my account
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
