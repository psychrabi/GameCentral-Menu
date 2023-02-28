import { create } from 'zustand'
import { fetchData } from '../../utils/sortByName'
import { persist, createJSONStorage } from 'zustand/middleware'

const member = JSON.parse(localStorage.getItem('member'))

export const useGamesStore = create(
  persist(
    (set, get) => ({
      filter: '',
      games: [],
      game: [],
      type: '',
      show: false,
      loading: false,
      error: null,
      fetchGames: async () => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientGames/${member.center_id}`, member.token)
          set({ games: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      getGame: async (id) => {
        set({ loading: true })
        try {
          const data = await get().games.filter((game) => game.id === id)
          set({ loading: false, game: data[0] })
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
      name: 'games-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
