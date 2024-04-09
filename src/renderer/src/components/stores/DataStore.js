import { fetchData, submitData } from '../../utils/fetchData'

export const createDataSlice = (set, get) => ({
  alert: '',
  applications: [],
  count: 0,
  favoriteGames: null,
  filter: '',
  game: null, // Standardized to null when no game is selected
  games: [],
  loading: false,
  messages: '',
  products: [],
  show: false,
  type: '',
  running: '',
  gameTypes: [],
  title: 'Favorite Games',
  fetchGames: async (centerId, token) => {
    // CamelCased parameters
    set({ loading: true })
    try {
      const games = await fetchData(`/clientGames/${centerId}`, token)
      set({ games: games })
    } catch (error) {
      // Renamed 'err' to 'error' for consistency
      set({ messages: error.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  fetchFavoriteGames: async (memberId, token) => {
    set({ loading: true })
    try {
      const favoriteGames = await fetchData(`/favoriteGames/${memberId}`, token)
      set({ favoriteGames: favoriteGames })
    } catch (error) {
      set({ messages: error.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  fetchApplications: async (centerId, token) => {
    set({ loading: true })
    try {
      const applications = await fetchData(`/clientApps/${centerId}`, token)
      set({ applications: applications })
    } catch (error) {
      set({ messages: error.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  fetchProducts: async (centerId, token) => {
    set({ loading: true })
    try {
      const products = await fetchData(`/clientProducts/${centerId}`, token)
      set({ products: products })
    } catch (error) {
      set({ messages: error.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  toggleFavoriteGame: async (centerId, memberId, gameId, token) => {
    const payload = { centerId, memberId, gameId }
    set({ loading: true })
    try {
      const response = await submitData('/favoriteGame', token, payload)
      const gameName = get().game.name

      set({
        show: !get().show,
        messages: `${gameName}: ${response.message}`,
        alert: 'success'
      })

      get().fetchFavoriteGames(memberId, token)
    } catch (error) {
      set({ messages: error.message, alert: 'error' })
    } finally {
      set({ loading: false })
    }
  },
  runExecutable: async () => {
    const { executable, parameters } = get().game
    set({ loading: true })
    window.api
      .checkExecutable(executable)
      .then((response) => {
        if (response.status === 'file-exists') {
          const { status } = window.api.launchExecutable(executable, parameters)
        } else {
          throw new Error('Game executable missing')
        }
      })
      .then(() => {
        set({ messages: 'Game launched successfully', alert: 'success' })
      })
      .catch((error) => {
        set({ messages: error.message, alert: 'error' })
      })
      .finally(() => {
        set({ loading: false })
      })
  },
  getGame: (id) => {
    const game = get().games.find((game) => game.id === id)
    set({ game: game || null })
  },
  getFavoriteGame: (id) => {
    const game = get().favoriteGames.find((game) => game.id === id)
    set({ game: game || null })
  },
  getApplication: (id) => {
    const application = get().applications.find((app) => app.id === id)
    set({ game: application || null })
  },
  setCount: (count) => set({ count }),
  setFilter: (filter) => set({ filter }),
  setShow: () => set((state) => ({ show: !state.show })),
  setType: (type) => set({ type }),
  setMessages: (messages) => set({ messages }),
  setAlert: (alert) => set({ alert }),
  setTitle: (title) => set({ title }),
  setGameTypes: (types) => set({ gameTypes: types }),
  setRunning: (running) => set({ running })
})
