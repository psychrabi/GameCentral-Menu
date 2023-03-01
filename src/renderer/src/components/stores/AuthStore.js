import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import axiosClient from '../../lib/axios-client'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      loading: true,
      error: null,
      member: null,
      session: null,
      start_time: null,
      token: null,
      settings: null,
      sessionType: null,
      authenticate: async (username, password) => {
        try {
          const payload = {
            username: username,
            password: password
          }
          const response = await axiosClient.post('/members/login', payload)
          console.log(response.data)
          set({
            member: response.data.member,
            session: response.data.session,
            token: response.data.token,
            settings: response.data.settings,
            loading: false,
            start_time: Date.now()
          })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      setSessionType: (type) => {
        set({ sessionType: type })
      },
      logout: (cost_per_hour) => {
        const total_time = (Date.now() - get().start_time) / 1000 //in seconds
        const usage_details = {
          session_cost: ((total_time / 1000 / (60 * 60)) * cost_per_hour).toFixed(0),
          total_time: total_time,
          sessionType: get().sessionType,
          session_id: get().session.id
        }
        console.log(usage_details)
        const response = axiosClient.post('/members/logout', usage_details)
        console.log(response)
        set({ token: null, session: null, userType: null, members: null })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
