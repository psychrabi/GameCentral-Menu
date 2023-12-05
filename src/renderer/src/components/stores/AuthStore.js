import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import axiosClient from '../../lib/axios-client'
import { updateData } from '../../utils/fetchData'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      loading: false,
      show: false,
      messages: null,
      alert: null,
      member: null,
      session: null,
      start_time: null,
      type: '',
      client_details: null,
      token: null,
      admin_token: null,
      settings: null,
      center_id: null,
      center_name: null,
      sessionType: null,
      authenticate: async (username, password) => {
        set({ loading: true })
        try {
          const payload = {
            username: username,
            password: password
          }
          const response = await axiosClient.post('/members/login', payload)
          if (response && response.status === 200) {
            set({
              loading: false,
              member: response.data.member,
              session: response.data.session,
              start_time: Date.now(),
              token: response.data.token,
              settings: response.data.settings
            })
            set({ messages: 'You have successfully logged in.', alert: 'success' })
          } else {
            console.log(response.data.message)
            set({ messages: response.data.message, alert: 'danger' })
          }

          const balance = get().member.balance
          const bonus_balance = get().member.bonus_balance
          const sessionType = balance > 0 || bonus_balance > 0 ? 'balance' : 'credit'
          set({ sessionType: sessionType })

          if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
            set({ messages: 'Not enough balance. Please top up your account.', alert: 'danger' })
            return
          }
          const credit = get().member.credit
          if (credit > 30) {
            set({
              messages: `You have ${credit} credit to be paid. Please pay it first.`,
              alert: 'info',
              loading: false
            })
            return
          }

          localStorage.setItem('token', JSON.stringify({ token: get().token }))
          localStorage.setItem('member', JSON.stringify(get().member))
          localStorage.setItem('session', JSON.stringify(get().session))
          localStorage.setItem('start_time', JSON.stringify(get().start_time))
          localStorage.setItem('settings', JSON.stringify(get().settings))
          localStorage.setItem('sessionType', JSON.stringify(get().sessionType))
        } catch (err) {
          set({ messages: err.response.data.message, loading: false, alert: 'danger' })
        }
      },
      authenticateAdmin: async (license, username, password) => {
        set({ loading: true })
        try {
          const payload = {
            license: license,
            username: username,
            password: password
          }
          const response = await axiosClient.post('/login', payload)

          set({
            loading: false,
            messages: 'Center account set.',
            alert: 'success',
            center_id: response.data.user.id,
            center_name: response.data.user.name,
            admin_token: response.data.token,
            settings: [response.data.settings]
          })
          localStorage.setItem('admin_token', response.data.token)
          localStorage.setItem('center_id', response.data.user.id)
          localStorage.setItem('center_name', response.data.user.name)
          localStorage.setItem('settings', JSON.stringify(response.data.settings))

        } catch (err) {
          set({ messages: 'Failed to login', loading: false, alert: 'danger' })
        }
      },
      updateMember: async (id, updatedMember) => {
        set({ loading: true })
        try {
          const data = await updateData(`/members/${id}`, updatedMember)
          console.log(data)
          set({
            loading: false,
            messages: 'FYour profile is successfully updated.',
            member: updatedMember
          })
          localStorage.setItem('member', JSON.stringify(get().member))
        } catch (err) {
          set({ messages: err.response.data.message, loading: false, alert: 'danger' })
        }
      },
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
      // },
      checkCenterID: () => {
        if (localStorage.getItem('center_id')) {
          console.log(JSON.parse(localStorage.getItem('center_id')))
          set({ center_id: JSON.parse(localStorage.getItem('center_id')) })
        }
      },
      checkSession: () => {
        if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')).token)
          set({ token: JSON.parse(localStorage.getItem('token')).token })
        }
        if (localStorage.getItem('member'))
          set({ member: JSON.parse(localStorage.getItem('member')) })
        if (localStorage.getItem('start_time'))
          set({ start_time: JSON.parse(localStorage.getItem('start_time')) })
        if (localStorage.getItem('session'))
          set({ session: JSON.parse(localStorage.getItem('session')) })
        if (localStorage.getItem('sessionType'))
          set({ sessionType: JSON.parse(localStorage.getItem('sessionType')) })
      },
      logout: async (cost_per_hour) => {
        const total_time = (Date.now() - get().start_time) / 1000 //in seconds
        const usage_details = {
          session_id: get().session.id,
          total_time: total_time,
          sessionType: get().sessionType,
          session_cost: ((total_time / (60 * 60)) * cost_per_hour).toFixed(2)
        }
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${get().token}`
        axiosClient.post('/members/logout', usage_details).then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('member')
          localStorage.removeItem('session')
          localStorage.removeItem('start_time')
          localStorage.removeItem('data')
          set({ member: null, session: null, sessionType: null, start_time: null, token: null })
        })
        set({ messages: 'You have successfully logged out', alert: 'success' })
      },
      checkClientInfo: async () => {
        let info = await window.api.getSystemInfo()
        set({
          client_details: {
            cpu: info.cpu.manufacturer + ' ' + info.cpu.brand,
            graphics: info.graphics.controllers.filter((controller) => controller.vram > 0)[0]
              .model,
            ram: (info.mem.total / (1024 * 1024 * 1024)).toFixed(2) + 'GB',
            os: info.osInfo.distro + ' build ' + info.osInfo.build,
            ip4: info.networkInterfaces[0].ip4
          }
        })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
