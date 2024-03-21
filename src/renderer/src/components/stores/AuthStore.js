import axiosClient from '../../lib/axios-client'
import { updateData, submitData } from '../../utils/fetchData'

export const createAuthSlice =
  (set, get) => ({
    alert: null,
    center_id: null,
    center_name: null,
    loading: false,
    member: null,
    messages: null,
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
    authenticate: async (username, password) => {
      set({ loading: true })
      const payload = {
        username: username,
        password: password
      }
      const { data, status } = await axiosClient.post('/members/login', payload)
      try {

        if (status === 200) {
          const { member, session, token, sessions } = data

          setTimeout(() => {
            const sessionType = member.balance > 0 || member.bonus_balance > 0 ? 'balance' : 'credit'
            if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
              set({ messages: 'Not enough balance. Please top up your account.', alert: 'danger' })
              return
            }
            if (member.credit > 30) {
              set({
                messages: `You have ${member.credit} credit to be paid. Please pay it first.`,
                alert: 'info',
                loading: false
              })
              return
            }
            set({
              loading: false,
              member,
              session,
              token,
              start_time: Date.parse(session.start_time),
              messages: 'You have successfully logged in.', alert: 'success',
              sessionType,
              sessions
            })
            const localStorageItems = {
              token: token,
              member: member,
              session: session,
              start_time: Date.parse(session.start_time),
              sessionType: sessionType,
              sessions: sessions
            }
            Object.entries(localStorageItems).forEach(([key, value]) => {
              localStorage.setItem(key, JSON.stringify(value))
            })

          }, 2000);
        }
      } catch (err) {
        set({
          messages: 'Provided username or password is incorrect',
          loading: false,
          alert: 'danger'
        })
      }
    },
    authenticateAdmin: async (license, username, password) => {
      set({ loading: true })
      try {
        const payload = { license, username, password }
        const { data } = await axiosClient.post('/login', payload)
        const localStorageItems = {
          center_id: data.user.id,
          center_name: data.user.center_name,
          settings: data.settings,
          subscription: data.expire_date
        }

        set({
          alert: 'success',
          center_id: data.user.id,
          center_name: data.user.center_name,
          loading: false,
          messages: 'Center Account set successfully.',
          settings: data.settings ?? [''],
          subscription: data.expire_date
        })

        Object.entries(localStorageItems).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value))
        })
      } catch (err) {
        set({ messages: 'Failed to login', loading: false, alert: 'danger' })
      }
    },
    registerMember: async (username, password, password_confirmation, email) => {
      set({ loading: true })
      try {
        const payload = {
          center_id: get().center_id,
          email,
          username,
          password,
          password_confirmation
        }
        const response = await axiosClient.post('/members/signup', payload)
        const { user, token, settings } = response.data
        const localStorageItems = {
          token,
          center_id: user.id,
          center_name: user.center_name,
          settings: settings
        }

        set({
          loading: false,
          messages: 'Account registration successful',
          alert: 'success',
          center_id: user.id,
          center_name: user.center_name,
          settings: [settings]
        })

        Object.entries(localStorageItems).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value))
        })
      } catch (err) {
        set({ messages: 'Failed to login', loading: false, alert: 'danger' })
      }
    },
    updateMember: async (id, payload) => {
      set({ loading: true })
      try {
        // console.log(payload)
        const data = await updateData(`/members/${id}`, get().token, payload)
        // console.log(data)
        set({
          loading: false,
          messages: 'Your profile is successfully updated.',
          member: data,
          alert: 'success'
        })
        localStorage.setItem('member', JSON.stringify(get().member))
      } catch (err) {
        set({ messages: err.data.message, loading: false, alert: 'danger' })
      }
    },
    reset: () => {
      set({ member: null, session: null, sessionType: null, start_time: null, token: null, sessions: null, favoriteGames: null })
    },
    checkSession: () => {
      if (localStorage.getItem('token')) {
        set({ token: JSON.parse(localStorage.getItem('token')).token })
      }
      // if (localStorage.getItem('center_name')) {
      //   set({ center_name: JSON.parse(localStorage.getItem('center_name')) })
      // }
      if (localStorage.getItem('member'))
        set({ member: JSON.parse(localStorage.getItem('member')) })
      if (localStorage.getItem('start_time'))
        set({ start_time: JSON.parse(localStorage.getItem('start_time')) })
      if (localStorage.getItem('session'))
        set({ session: JSON.parse(localStorage.getItem('session')) })
      if (localStorage.getItem('sessionType'))
        set({ sessionType: JSON.parse(localStorage.getItem('sessionType')) })

    },
    checkSystemInfo: async () => {
      if (localStorage.getItem('systemInfo')) {
        set({ systeminfo: JSON.parse(localStorage.getItem('systemInfo')) })
        // console.log(get().systeminfo)
      } else {
        // console.log('getting systeminfo')
        try {
          let info = await window.api.getSystemInfo()
          get().setSystemInfo(info)
          localStorage.setItem('systemInfo', JSON.stringify(get().systeminfo))
        } catch (error) {
          console.log(error)
          set({ message: error, alert: 'danger ' })
        }
      }
    },
    checkCenterID: () => {
      if (localStorage.getItem('center_id'))
        set({ center_id: JSON.parse(localStorage.getItem('center_id')) })

      if (localStorage.getItem('center_name'))
        set({ center_name: JSON.parse(localStorage.getItem('center_name')) })

      if (get().center_id && get().center_name) {
        return true
      }
      return false
    },
    setSystemInfo: async (info) => {
      set({
        systeminfo: {
          cpu: info.cpu.manufacturer + ' ' + info.cpu.brand,
          graphics: info.graphics.controllers.filter((controller) => controller.vram > 0)[0]
            .model,
          ram: (info.mem.total / (1024 * 1024 * 1024)).toFixed(2) + 'GB',
          os: info.osInfo.distro + ' build ' + info.osInfo.build,
          ip4: info.networkInterfaces[0].ip4
        }
      })
    },
    setMessages: (messages) => set({ messages }),
    setType: (type) => set({ type })
    // updatePassword: async (id, newPassword) => {
    //   set({ loading: true })
    //   try {
    //     const data = await updateData(`/members/${id}`, newPassword)
    //     console.log(data)
    //     set({
    //       loading: false,
    //       error: null,
    //       member: updatedMember
    //     })
    //     localStorage.setItem('member', JSON.stringify(get().member))
    //   } catch (err) {
    //     set({ error: err.response.data.message, loading: false })
    //   }
    // }
  })
