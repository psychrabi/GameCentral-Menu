import { useEffect, useState } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { Loading } from '../../components/ui/Loading'

export default function Security() {
  const member = useAuthStore((state) => state.member)
  const loading = useAuthStore((state) => state.loading)
  const updateMember = useAuthStore((state) => state.updateMember)
  const error = useAuthStore((state) => state.error)
  const token = useAuthStore((state) => state.token)

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
    <>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card mb-4">
            <div className="card-header">Change Password</div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <input
                    className="form-control"
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    onChange={(ev) =>
                      setUpdatedMember({ ...updatedMember, current_password: ev.target.value })
                    }
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
                    onChange={(ev) =>
                      setUpdatedMember({ ...updatedMember, password: ev.target.value })
                    }
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
                      setUpdatedMember({ ...updatedMember, password_confirmation: ev.target.value })
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
