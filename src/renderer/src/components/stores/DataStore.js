import { fetchData, submitData } from '../../utils/fetchData';

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
  title: 'Favorite Games',
  fetchGames: async (centerId, token) => { // CamelCased parameters
    set({ loading: true });
    try {
      const games = await fetchData(`/clientGames/${centerId}`, token);
      set({ games, loading: false });
    } catch (error) { // Renamed 'err' to 'error' for consistency
      set({ messages: error.message, loading: false, alert: 'danger' });
    }
  },
  fetchFavoriteGames: async (memberId, token) => {
    set({ loading: true });
    try {
      const favoriteGames = await fetchData(`/favoriteGames/${memberId}`, token);
      set({ favoriteGames, loading: false });
    } catch (error) {
      set({ messages: error.message, loading: false, alert: 'danger' });
    }
  },
  fetchApplications: async (centerId, token) => {
    set({ loading: true });
    try {
      const applications = await fetchData(`/clientApps/${centerId}`, token);
      set({ applications, loading: false });
    } catch (error) {
      set({ messages: error.message, loading: false, alert: 'danger' });
    }
  },
  fetchProducts: async (centerId, token) => {
    set({ loading: true });
    try {
      const products = await fetchData(`/clientProducts/${centerId}`, token);
      set({ products, loading: false });
    } catch (error) {
      set({ messages: error.message, loading: false, alert: 'danger' });
    }
  },
  toggleFavoriteGame: async (centerId, memberId, gameId, token) => {
    const payload = { centerId, memberId, gameId };
    set({ loading: true })
    try {
      const response = await submitData('/favoriteGame', token, payload);
      // console.log(response);
      const gameName = get().game.name;
      set({
        messages: `${gameName}: ${response.message}`,
        alert: 'success',
        show: !get().show
      });
      get().fetchFavoriteGames(memberId, token);

    } catch (error) {
      set({ messages: error.message, alert: 'danger' });
    } finally {
      set({ loading: false });
    }
  },
  runExecutable: async (executable, parameters) => {
    set({ loading: true });
    window.api.checkExecutable(executable)
      .then(response => {
        if (response.status === 'file-exists') {
          const { status } = window.api.launchExecutable(executable, parameters);
          // console.log(status)
        } else {
          throw new Error('Game executable missing');
        }
      })
      .then(() => {
        set({ messages: 'Game launched successfully', alert: 'success' });
      })
      .catch(error => {
        set({ messages: error.message, alert: 'danger' });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  getGame: (id) => {
    const game = get().games.find((game) => game.id === id);
    set({ game: game || null });
  },
  getFavoriteGame: (id) => {
    const game = get().favoriteGames.find((game) => game.id === id);
    set({ game: game || null });
  },
  getApplication: (id) => {
    const application = get().applications.find((app) => app.id === id);
    set({ game: application || null });
  },
  setCount: (count) => set({ count }),
  setFilter: (filter) => set({ filter }),
  setShow: () => set((state) => ({ show: !state.show })),
  setType: (type) => set({ type }),
  setMessages: (messages) => set({ messages }),
  setAlert: (alert) => set({ alert }),
  setTitle: (title) => set({ title }),
  // setRunning: (running) => set({ running })
  // ... (remaining properties and methods)
});
