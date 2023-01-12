import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
  token: null,
  notification: null,
  show: null,
  header: null,
  search: null,
  title: null,
  count: null,
  setToken: () => {},
  setNotification: () => {},
  setShow: () => {},
  setHeader: () => {},
  setSearch: () => {},
  setTitle: () => {}
})

export const ContextProvider = ({ children }) => {
  const [show, setShow] = useState('')
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')

  const [notification, _setNotification] = useState('')
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

  const setNotification = (message) => {
    _setNotification(message)
    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token)
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }
  return (
    <StateContext.Provider
      value={{
        token,
        notification,
        show,
        title,
        search,
        setShow,
        setToken,
        setNotification,
        setSearch,
        setTitle
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
