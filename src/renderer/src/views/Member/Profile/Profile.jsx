import { useEffect, useState } from 'react'
import axiosClient from '../../../lib/axios-client'
import { useStateContext } from '../../../components/contexts/ContextProvider'
import categories from '../../../data/AppTypes.json'
import Header from '../../../components/ui/Header.jsx'

export default function Profile() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const { setNotification, setTitle, title } = useStateContext()
  const count = null
  const [member, setMember] = useState({
    id: null,
    username: '',
    password: '',
    password_confirmation: '',
    balance: '',
    bonus_balance: '',
    credit: '',
    status: '',
    first_name: '',
    last_name: '',
    birthday: '',
    identification: '',
    email: '',
    comment: '',
    expired_at: ''
  })

  useEffect(() => {
    setTitle('Profile')
    setLoading(true)
    axiosClient
      .get('/member')
      .then(({ data }) => {
        setLoading(false)
        setMember(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const handleCategoriesChange = (event) => {
    console.log(event.target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    axiosClient
      .put(`/members/${member.id}`, member)
      .then(() => {
        setNotification('Your profile was updated successfully.')
      })
      .catch((err) => {
        const response = err.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <>
      <Header
        title={title}
        categories={categories}
        handleCategoriesChange={handleCategoriesChange}
        count={count}
      />

      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={member.first_name}
              onChange={(ev) => setMember({ ...member, first_name: ev.target.value })}
              placeholder="First name"
            />
            <input
              type="text"
              value={member.last_name}
              onChange={(ev) => setMember({ ...member, last_name: ev.target.value })}
              placeholder="Last name"
            />
            <input
              type="email"
              value={member.email}
              onChange={(ev) => setMember({ ...member, email: ev.target.value })}
              placeholder="Email address"
            />
            <input
              type="password"
              onChange={(ev) => setMember({ ...member, password: ev.target.value })}
              placeholder="Password"
            />
            <input
              type="password"
              onChange={(ev) => setMember({ ...member, password_confirmation: ev.target.value })}
              placeholder="Password Confirmation"
            />
            <button className="btn btn-block">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
