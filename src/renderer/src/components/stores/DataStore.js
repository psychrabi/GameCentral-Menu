import { create } from 'zustand'
import { fetchData } from '../../utils/fetchData'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useDataStore = create(
  persist(
    (set, get) => ({
      alert: null,
      applications: [],
      error: null,
      favoriteGames: [],
      filter: '',
      games: [],
      loading: false,
      messages: null,
      products: [],
      game: [],
      type: '',
      show: false,
      fetchGames: async (center_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientGames/${center_id}`, token)
          set({ error: null, games: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchFavoriteGames: async (id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/favoriteGames/${id}`, token)
          set({ error: null, favoriteGames: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchApplications: async (center_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientApps/${center_id}`, token)
          set({ error: null, applications: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchProducts: async (center_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientProducts/${center_id}`, token)
          set({ error: null, products: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      getGame: async (id) => {
        // console.log(id)
        try {
          const data = await get().games.filter((game) => game.id === id)
          // console.log(data)
          set({ error: null, loading: false, game: data[0] })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      getFavoriteGame: async (id) => {
        set({ loading: true })
        try {
          const data = await get().favoriteGames.filter((game) => game.id === id)
          set({ error: null, loading: false, game: data[0] })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      getApplication: async (id) => {
        set({ loading: true })
        try {
          const data = await get().applications.filter((app) => app.id === id)
          set({ error: null, loading: false, game: data[0] })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      setFilter: (filter) =>
        set((state) => ({
          ...state,
          filter
        })),
      setShow: (show) => {
        set({ show: show })
      },
      setType: (type) => {
        set({ loading: true })
        try {
          set({ type: type, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      setMessages: (message) => {
        set({ messages: message })
      },
      setAlert: (type) => {
        set({ alert: type })
      }
    }),
    {
      name: 'data-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
