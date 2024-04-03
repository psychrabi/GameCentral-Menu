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
      console.log(data)
      const { id, center_name } = data.user

      set({
        alert: 'success',
        center_id: id,
        center_name,
        loading: false,
        settings: data.settings,
        messages: 'Center Account set successfully.'
      })

      localStorage.setItem('center_id', JSON.stringify(id))
      localStorage.setItem('center_name', JSON.stringify(center_name))
      localStorage.setItem('settings', JSON.stringify(data.settings))
    } catch (err) {
      console.log(err)
      set({ messages: 'Failed to login', loading: false, alert: 'danger' })
    }
  },
  memberLogin: async (payload) => {
    set({ loading: true })
    try {
      const { data } = await axiosClient.post('/members/login', payload)

      const { member, session, token, sessions } = data
      const sessionType = member.balance > 1

      // TODO: Find a different way to handle credit session
      // const sessionType = member.balance > 0 || member.bonus_balance > 0 ? 'balance' : 'credit'
      // if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
      //   set({ messages: 'Not enough balance. Please top up your account.', alert: 'danger', loading: false })
      //   return
      // }
      // if (member.credit > 30) {
      //   set({
      //     messages: `You have ${member.credit} credit to be paid. Please pay it first.`,
      //     alert: 'info',
      //     loading: false
      //   })
      //   return
      // }
      set({
        loading: false,
        member,
        session,
        token,
        start_time: Date.parse(session.start_time),
        messages: 'You have successfully logged in.',
        alert: 'success',
        sessionType,
        sessions
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
    } catch (err) {
      set({
        messages: 'Provided username or password is incorrect',
        loading: false,
        alert: 'danger'
      })
    }
  },

  memberSignup: async (payload) => {
    set({ loading: true })
    try {
      payload['center_id'] = get().center_id

      const response = await axiosClient.post('/members/signup', payload)
      console.log(response)
      set({
        messages: response.data.message,
        alert: 'success'
      })
    } catch (err) {
      console.log(err)
      set({ messages: err.response.data.message, alert: 'danger' })
    } finally {
      set({
        loading: false
      })
    }
  },
  memberUpdate: async (id, payload) => {
    set({ loading: true })
    try {
      const data = await updateData(`/members/${id}`, get().token, payload)
      set({ member: data })
      localStorage.setItem('member', JSON.stringify(data))
      set({ loading: false, messages: 'Your profile is successfully updated.', alert: 'success' })
    } catch (err) {
      set({ messages: err.response.data.message, loading: false, alert: 'danger' })
    }
  },
  reset: () => {
    set({
      member: null,
      session: null,
      sessionType: null,
      start_time: null,
      token: null,
      sessions: null,
      favoriteGames: null
    })
  },
  checkSession: () => {
    ;[
      'token',
      'member',
      'start_time',
      'session',
      'sessionType',
      'center_id',
      'center_name',
      'settings'
    ].forEach((key) => {
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
        const info = await window.api.getSystemInfo()
        systeminfo = JSON.stringify({
          cpu: `${info.cpu.manufacturer} ${info.cpu.brand}`,
          graphics: info.graphics.controllers.find((controller) => controller.vram > 0).model,
          ram: `${(info.mem.total / 1024 ** 3).toFixed(2)}GB`,
          os: `${info.osInfo.distro} build ${info.osInfo.build}`,
          ip4: info.networkInterfaces[0].ip4
        })
        localStorage.setItem('systemInfo', systeminfo)
      } catch (error) {
        console.error(error)
        set({ message: error.message, alert: 'danger' })
        return
      }
    }
    set({ systeminfo: JSON.parse(systeminfo) })
  },
  checkCenterID: () => {
    const centerId = localStorage.getItem('center_id')
    const centerName = localStorage.getItem('center_name')

    if (centerId) set({ center_id: JSON.parse(centerId) })
    if (centerId) set({ center_id: JSON.parse(centerId) })
    if (centerName) set({ center_name: JSON.parse(centerName) })

    return !!(centerId && centerName)
  },
  setMessages: (messages) => set({ messages }),
  setType: (type) => set({ type })
})
