import { create } from 'zustand'
import { fetchData, submitData } from '../../utils/fetchData'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useDataStore = create(
  persist(
    (set, get) => ({
      alert: null,
      applications: [],
      count: 0,
      favoriteGames: [],
      filter: '',
      game: [],
      games: [],
      loading: false,
      messages: null,
      products: [],
      show: false,
      type: '',
      fetchGames: async (center_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientGames/${center_id}`, token)
          set({ games: data, loading: false })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      fetchFavoriteGames: async (member_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/favoriteGames/${member_id}`, token)
          set({ favoriteGames: data, loading: false })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      fetchApplications: async (center_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientApps/${center_id}`, token)
          set({ applications: data, loading: false })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      fetchProducts: async (center_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientProducts/${center_id}`, token)
          set({ products: data, loading: false })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      toggleFavoriteGame: async (center_id, member_id, game_id, token) => {
        console.log('toggle favorite game')
        const payload = {
          center_id,
          member_id,
          game_id
        }
        try {
          const response = await submitData('/favoriteGame', token, payload)
          set({
            messages: get().game.name + ' : ' + response.message,
            alert: 'success',
            show: !get().show
          })
          get().fetchFavoriteGames(member_id, token)
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      runExecutable: async () => {
        try {
          window.api.checkExecutable(get().game.executable).then((response) => {
            console.log(response)
            if (response.status === 'file-exists') {
              window.api
                .launchExecutable(get().game.executable)
                .then((response) => console.log(response))
            }

            if (response.status === 'file-does-not-exist') {
              set({ messages: 'Game executable missing', alert: 'danger' })
            }
            // console.log(response)
          })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      getGame: async (id) => {
        // console.log(id)
        try {
          const data = await get().games.filter((game) => game.id === id)
          // console.log(data)
          set({ loading: false, game: data[0] })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      getFavoriteGame: async (id) => {
        set({ loading: true })
        try {
          const data = await get().favoriteGames.filter((game) => game.id === id)
          set({ loading: false, game: data[0] })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      getApplication: async (id) => {
        set({ loading: true })
        try {
          const data = await get().applications.filter((app) => app.id === id)
          set({ loading: false, game: data[0] })
        } catch (err) {
          console.error(err)
          set({ messages: err.message, loading: false, alert: 'danger' })
        }
      },
      setCount: (count) => set({ count }),
      setFilter: (filter) => set({ filter }),
      setShow: () => set((state) => ({ show: !state.show })),
      setType: (type) => set({ type }),
      setMessages: (messages) => set({ messages }),
      setAlert: (alert) => set({ alert })
    }),
    {
      name: 'data-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
