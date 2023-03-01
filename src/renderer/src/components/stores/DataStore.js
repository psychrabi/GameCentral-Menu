import { create } from 'zustand'
import { fetchData } from '../../utils/sortByName'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useDataStore = create(
  persist(
    (set, get) => ({
      filter: '',
      games: [],
      favoriteGames: [],
      applications: [],
      products: [],
      game: [],
      type: '',
      show: false,
      loading: false,
      error: '',
      fetchGames: async (member) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientGames/${member.center_id}`, member.token)
          set({ error: null, games: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchFavoriteGames: async (member) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/favoriteGames/${member.id}`, member.token)
          set({ error: null, favoriteGames: data, loading: false })
          console.log(data)
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchApplications: async (member) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientApps/${member.center_id}`, member.token)
          set({ error: null, applications: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchProducts: async (member) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientProducts/${member.center_id}`, member.token)
          set({ error: null, products: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      getGame: async (id) => {
        set({ loading: true })
        try {
          const data = await get().games.filter((game) => game.id === id)
          set({ error: '', loading: false, game: data[0] })
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
      }
    }),
    {
      name: 'data-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
