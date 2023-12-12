import { create } from 'zustand'
import { fetchData, submitData } from '../../utils/fetchData'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useDataStore = create(
  persist(
    (set, get) => ({
      alert: null,
      applications: [],
      count: 0,
      error: null,
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
          set({ error: null, games: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchFavoriteGames: async (member_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/favoriteGames/${member_id}`, token)
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
      toggleFavoriteGame: async (center_id, member_id, game_id, token) => {
        console.log('toggle favorite game')
        const payload = {
          center_id,
          member_id,
          game_id
        }
        try {
          const response = await submitData('/favoriteGame', token, payload)
          if (response) {
            set({ messages: get().game.name + ' : ' + response.message, alert: 'success' })
            get().fetchFavoriteGames(member_id, token)
          } else {
            console.log(response)
          }
        } catch (error) {
          console.log(error.message)
          // setMessages('Favorite game status couldnot be changed for ' + game.name)
          set({ messages: error.message })
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
        } catch (error) {
          console.log(error)
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
      setCount: (count) => set({ count }),
      setFilter: (filter) => set({ filter }),
      setShow: (show) => set({ show }),
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
