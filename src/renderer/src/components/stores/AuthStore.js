import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import axiosClient from '../../lib/axios-client'
import { updateData, submitData } from '../../utils/fetchData'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      loading: false,
      error: null,
      member: null,
      session: null,
      start_time: null,
      token: null,
      settings: null,
      sessionType: null,
      authenticate: async (username, password) => {
        set({ loading: true })
        try {
          const payload = {
            username: username,
            password: password
          }
          const response = await axiosClient.post('/members/login', payload)
          console.log(response.data)
          set({
            loading: false,
            error: null,
            member: response.data.member,
            session: response.data.session,
            start_time: Date.now(),
            token: response.data.token,
            settings: response.data.settings
          })
          localStorage.setItem('token', JSON.stringify({ token: get().token }))
          localStorage.setItem('member', JSON.stringify(get().member))
          localStorage.setItem('session', JSON.stringify(get().session))
          localStorage.setItem('start_time', JSON.stringify(get().start_time))
          localStorage.setItem('settings', JSON.stringify(get().settings))
        } catch (err) {
          set({ error: err.response.data.message, loading: false })
        }
      },
      updateMember: async (id, updatedMember) => {
        set({ loading: true })
        try {
          const data = await updateData(`/members/${id}`, updatedMember)
          console.log(data)
          set({
            loading: false,
            error: null,
            member: updatedMember
          })
          localStorage.setItem('member', JSON.stringify(get().member))
        } catch (err) {
          set({ error: err.response.data.message, loading: false })
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
      },
      setSessionType: (type) => {
        set({ sessionType: type })
      },
      logout: async (cost_per_hour) => {
        const total_time = (Date.now() - get().start_time) / 1000 //in seconds
        const usage_details = {
          session_cost: ((total_time / 1000 / (60 * 60)) * cost_per_hour).toFixed(0),
          total_time: total_time,
          sessionType: get().sessionType,
          session_id: get().session.id
        }
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${get().token}`
        axiosClient.post('/members/logout', usage_details).then((response) => {
          console.log(response)
          localStorage.removeItem('token')
          localStorage.removeItem('member')
          localStorage.removeItem('session')
          localStorage.removeItem('start_time')
          localStorage.removeItem('data')
          localStorage.removeItem('settings')
          set({ member: null, session: null, sessionType: null, start_time: null, token: null })
        })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
