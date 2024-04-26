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
  fetchGames: async (center_id, token) => {
    try {
      if (localStorage.getItem('games')) {
        set({ games: JSON.parse(localStorage.getItem('games')) })
      } else {
        const games = await fetchData(`/clientGames/${center_id}`)
        set({ games: games })
        localStorage.setItem('games', JSON.stringify(games))
      }
    } catch (error) {
      // Renamed 'err' to 'error' for consistency
      set({ messages: error.message, alert: 'danger' })
    }
  },
  fetchFavoriteGames: async () => {
    const { member, token } = get()
    try {
      const favoriteGames = localStorage.getItem('favoriteGames')

      if (favoriteGames) {
        set({ favoriteGames: JSON.parse(localStorage.getItem('favoriteGames')) })
      } else {
        const favoriteGames = await fetchData(`/favoriteGames/${member.id}`, token)
        set({ favoriteGames: favoriteGames })
        localStorage.setItem('favoriteGames', JSON.stringify(favoriteGames))
      }
    } catch (error) {
      // Renamed 'err' to 'error' for consistency
      // console.log(error)
      set({ messages: error.response.data.message, alert: 'danger' })
    }
  },
  checkFavoriteGames: async () => {
    const { member, token } = get()

    const favoriteGames = await fetchData(`/favoriteGames/${member.id}`, token)
    const localFavoriteGames = JSON.parse(localStorage.getItem('favoriteGames'))?.length

    if (favoriteGames.length !== localFavoriteGames) {
      set({ favoriteGames: favoriteGames })
      localStorage.setItem('favoriteGames', JSON.stringify(favoriteGames))
    } else {
      set({ favoriteGames: JSON.parse(localStorage.getItem('favoriteGames')) })
    }
  },
  fetchApplications: async (center_id, token) => {
    set({ loading: true })

    try {
      if (localStorage.getItem('applications')) {
        set({ applications: JSON.parse(localStorage.getItem('applications')) })
      } else {
        const applications = await fetchData(`/clientApps/${center_id}`)
        set({ applications: applications })
        localStorage.setItem('applications', JSON.stringify(applications))
      }
    } catch (error) {
      // Renamed 'err' to 'error' for consistency
      set({ messages: error.message, alert: 'danger' })
    } finally {
      set({ loading: false })
    }
  },
  fetchProducts: async (center_id, token) => {
    try {
      if (localStorage.getItem('products')) {
        set({ products: JSON.parse(localStorage.getItem('products')) })
      } else {
        const products = await fetchData(`/clientProducts/${center_id}`, token)
        set({ products: products })
        localStorage.setItem('products', JSON.stringify(products))
      }
    } catch (error) {
      // Renamed 'err' to 'error' for consistency
      set({ messages: error.message, alert: 'danger' })
    }
  },
  fetchData: async () => {
    const { center_id, token } = get()
    const data = ['games', 'applications', 'products']
    set({ loading: true })
    data.forEach(async (item) => {
      if (localStorage.getItem(item)) {
        set({ [item]: JSON.parse(localStorage.getItem(item)) })
      }
    })

    if (!get().games.length || !get().applications.length || !get().products.length) {
      await get().fetchGames(center_id, token)
      await get().fetchApplications(center_id, token)
      await get().fetchProducts(center_id, token)
    }

    set({ loading: false })
  },
  toggleFavoriteGame: async () => {
    const { token, game } = get()

    set({ loading: true })
    try {
      // console.log(payload)
      const response = await submitData(`/toggleFavoriteGame/${game.id}`, token)
      const gameName = get().game.name

      set({
        show: !get().show,
        messages: `${gameName}: ${response.message}`,
        alert: 'success'
      })
      await get().checkFavoriteGames()
    } catch (error) {
      set({ messages: error.message, alert: 'danger' })
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
        set({ messages: error.message, alert: 'danger' })
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
