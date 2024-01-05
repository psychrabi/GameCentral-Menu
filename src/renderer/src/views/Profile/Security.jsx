import { useState } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'

export default function Security() {
  const member = useBoundStore((state) => state.member)
  const updateMember = useBoundStore((state) => state.updateMember)
  const token = useBoundStore((state) => state.token)

  const [updatedMember, setUpdatedMember] = useState(member)

  function onSubmit(ev) {
    ev.preventDefault()
    updateMember(member.id, token, updatedMember)
  }

  return (
    <>
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
              setUpdatedMember({
                ...updatedMember,
                current_password: ev.target.value
              })
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
              setUpdatedMember({
                ...updatedMember,
                password: ev.target.value
              })
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
              setUpdatedMember({
                ...updatedMember,
                password_confirmation: ev.target.value
              })
            }
          />
        </div>
        <button className="btn btn-primary" type="button">
          Save
        </button>
      </form>
    </>
  )
}
