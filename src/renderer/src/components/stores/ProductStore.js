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
      paymentMode: '',
      taxRate: 0.13, // 13% by default
      show: false,
      loading: false,
      error: null,
      fetchProducts: async (center_id, token) => {
        try {
          set({ loading: true })
          const data = await fetchData(`/clientProducts/${center_id}`, token)
          set({ error: null, products: data, loading: false })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      addToCart: (id) => {
        const item = get().products.find((product) => product.id === id)
        const inCart = get().cart.find((item) => (item.id === id ? true : false))
        // console.log('here', item)
        set((state) => ({
          cart: inCart
            ? state.cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
            : [...state.cart, { ...item, quantity: 1 }]
        }))
        // console.log('cart', get().cart)
      },
      removeFromCart: (id) => {
        const item = get().cart.find((item) => item.id === id)
        // console.log('remove : ', id, item)

        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1
            set((state) => ({
              cart: [...state.cart]
            }))
          } else {
            set((state) => ({
              cart: state.cart.filter((item) => item.id !== id)
            }))
          }
        }
      },
      setPaymentMode: (mode) => {
        set({ paymentMode: mode })
      },
      clearCart: () => {
        set({ cart: [] })
      },
      fetchSingleProduct: async (id, token) => {
        try {
          set({ loading: true })
          const response = await fetchData(`/products/${id}`, token)
          set({
            loading: false,
            singleProduct: response.data
          })
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      checkOut: (member_id, subTotal, tax, total) => {
        const payload = {
          member_id: member_id,
          items: get().cart,
          subTotal: subTotal,
          tax: tax,
          total: total,
          paymentMode: get().paymentMode
        }
        console.log(payload)
      }
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
