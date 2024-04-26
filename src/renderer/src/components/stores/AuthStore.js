import axiosClient from '../../lib/axios-client'
import { updateData, submitData } from '../../utils/fetchData'

export const createAuthSlice = (set, get) => ({
  alert: '',
  center_id: null,
  center_name: null,
  loading: false,
  member: null,
  messages: '',
  session: null,
  sessionType: null,
  settings: null,
  show: false,
  start_time: null,
  subscription: '',
  systeminfo: null,
  token: null,
  type: '',
  sessions: [],
  centerLogin: async (payload) => {
    set({ loading: true })
    try {
      const { data } = await axiosClient.post('/login', payload)
      const { id, center_name } = data.user

      set({
        center_id: id,
        center_name,
        settings: data.settings,
        messages: 'Center Account set successfully.',
        alert: 'success'
      })

      localStorage.setItem('center_id', JSON.stringify(id))
      localStorage.setItem('center_name', JSON.stringify(center_name))
      localStorage.setItem('settings', JSON.stringify(data.settings))
    } catch (err) {
      set({ messages: 'Failed to login', alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  memberLogin: async (payload) => {
    set({ loading: true })
    try {
      const { data } = await axiosClient.post('/members/login', payload)

      const { member, session, token, sessions } = data
      // const sessionType = member.balance > 1 ? 'balance' : 'credit'

      // TODO: Find a different way to handle credit session
      const sessionType = member.balance > 0 || member.bonus_balance > 0 ? 'balance' : 'credit'
      // console.log(sessionType)
      if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
        console.log('credit check')
        set({
          messages: 'Not enough balance. Please top up your account.',
          alert: 'error',
          loading: false
        })
        return
      }
      if (member.credit > 30) {
        console.log('credit check')

        set({
          messages: `You have ${member.credit} credit to be paid. Please pay it first.`,
          alert: 'info',
          loading: false
        })
        return
      } else {
        set({
          member,
          session,
          token,
          start_time: Date.parse(session.start_time),
          sessionType,
          sessions,
          messages: 'You have successfully logged in.',
          alert: 'success'
        })
        const localStorageItems = {
          token,
          member,
          session,
          start_time: Date.parse(session.start_time),
          sessionType,
          sessions
        }

        Object.entries(localStorageItems).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value))
        })
      }
    } catch (err) {
      // console.log(err)
      set({ messages: err.response.data.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },

  memberSignup: async (payload) => {
    set({ loading: true })
    try {
      payload['center_id'] = get().center_id

      const response = await axiosClient.post('/members/signup', payload)
      set({ messages: response.data.message, alert: 'success' })
    } catch (err) {
      set({ messages: err.response.data.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  memberUpdate: async (id, payload) => {
    set({ loading: true })
    try {
      const data = await updateData(`/members/${id}`, get().token, payload)
      set({ member: data })

      localStorage.setItem('member', JSON.stringify(data))

      set({ messages: 'Your profile is successfully updated.', alert: 'success' })
    } catch (err) {
      set({ messages: err.response.data.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  reset: () => {
    const keys = [
      'member',
      'session',
      'sessionType',
      'start_time',
      'token',
      'sessions',
      'favoriteGames',
      'game',
      'cart'
    ]
    keys.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key)
      }
      set({ [key]: null })
    })
  },
  checkSession: () => {
    const keys = [
      'token',
      'member',
      'start_time',
      'session',
      'sessionType',
      'center_id',
      'center_name',
      'settings'
    ]
    keys.forEach((key) => {
      const item = localStorage.getItem(key)
      if (item) {
        set({ [key]: JSON.parse(item) })
      }
    })
  },
  checkSystemInfo: async () => {
    let systeminfo = localStorage.getItem('systemInfo')
    if (!systeminfo) {
      try {
        const info = await invoke('get_sys_info')
        localStorage.setItem('systemInfo', info)
      } catch (error) {
        set({ message: error.message, alert: 'error' })
        return
      }
    }
    set({ systeminfo: JSON.parse(systeminfo) })

    // invoke('scan_epic_games_installations').then((response) => {
    //   console.log('invoked')
    //   console.log(response)
    // })
    // invoke('scan_ubisoft_installations').then((response) => {
    //   console.log(response)
    // })
  },
  checkCenterID: () => {
    const centerId = localStorage.getItem('center_id')
    const centerName = localStorage.getItem('center_name')

    if (centerId) set({ center_id: JSON.parse(centerId) })
    if (centerName) set({ center_name: JSON.parse(centerName) })

    return !!(centerId && centerName)
  },
  setMessages: (messages) => set({ messages }),
  setType: (type) => set({ type })
})
