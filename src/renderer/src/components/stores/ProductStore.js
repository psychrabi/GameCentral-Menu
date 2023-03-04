import { create } from 'zustand'
import { fetchData } from '../../utils/fetchData'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useProductStore = create(
  persist(
    (set, get) => ({
      filter: '',
      products: [],
      cart: [],
      singleProduct: {},
      type: '',
      show: false,
      loading: false,
      error: null,
      fetchProducts: async (center_id, token) => {
        set({ loading: true })
        try {
          const data = await fetchData(`/clientProducts/${ }`, token)
          set({ error: null, products: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      addToCart: (id) => {
        const state = get()
        const item = state.products.find((product) => product.id === id)
        const inCart = state.cart.find((item) => (item.id === id ? true : false))
        console.log('here', item)

        set({
          cart: inCart
            ? state.cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
            : [...state.cart, { ...item, qty: 1 }]
        })
      },
      removeFromCart: (id) => {
        const state = get()
        const item = state.cart.find((item) => {
          console.log(item)
          item.id === id
        })
        console.log('remove : ', id, item)
        set({
          cart: state.cart.filter((item) => item.id != id)
        })
      },
      fetchSingleProduct: async (id, token) => {
        const response = await fetchData(`/products/${id}`, token)
        set({
          loading: false,
          singleProduct: response.data
        })
      }
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
