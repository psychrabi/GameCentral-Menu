import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
  token: null,
  notifications: null,
  show: null,
  header: null,
  search: null,
  title: null,
  count: null,
  member: null,
  setToken: () => {},
  setNotifications: () => {},
  setShow: () => {},
  setHeader: () => {},
  setSearch: () => {},
  setTitle: () => {},
  setMember: () => {}
})

export const ContextProvider = ({ children }) => {
  const [show, setShow] = useState('')
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [member, setMember] = useState('')

  const [notifications, _setNotifications] = useState('')
  const [token, _setToken] = useState(localStorage.getItem('token'))

  const setNotifications = (message) => {
    _setNotifications(message)
    setTimeout(() => {
      _setNotifications('')
    }, 5000)
  }

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }
  return (
    <StateContext.Provider
      value={{
        token,
        notifications,
        show,
        title,
        search,
        member,
        setShow,
        setToken,
        setNotifications,
        setSearch,
        setTitle,
        setMember
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
