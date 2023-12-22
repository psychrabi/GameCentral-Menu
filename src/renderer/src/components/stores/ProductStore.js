import { create } from 'zustand'
import { fetchData } from '../../utils/fetchData'
import { persist, createJSONStorage } from 'zustand/middleware'

export const createProductSlice =
  (set, get) => ({
    filter: '',
    products: [],
    cart: [],
    singleProduct: {},
    type: '',
    paymentMode: '',
    taxRate: 0.15, // 13% by default
    show: false,
    loading: false,
    notification: null,
    error: null,
    messages: '',
    alert: '',
    fetchProducts: async (center_id, token) => {
      try {
        set({ loading: true })
        const data = await fetchData(`/clientProducts/${center_id}`, token)
        set({ error: null, products: data, loading: false })
      } catch (err) {
        set({ error: err.message, loading: false })
      }
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
    checkOut: async (member_id, subTotal, tax, total) => {
      const payload = {
        member_id: member_id,
        items: get().cart,
        subTotal: subTotal,
        tax: tax,
        total: total,
        paymentMode: get().paymentMode
      }
      console.log(payload)
    },
    subTotal: () =>
      get().cart.reduce((total, item) => total + item.sales_price * item.quantity, 0),
    tax: () => get().subTotal() * get().taxRate,
    total: () => get().subTotal() + get().tax(),
    addToCart: (id) => {
      const item = get().products.find((product) => product.id === id)
      const inCart = get().cart.find((item) => item.id === id)

      if (inCart && item.stock == inCart.quantity) {
        set({ messages: 'Product quatity exceed', alert: 'danger' })
      } else {
        set((state) => ({
          cart: inCart
            ? state.cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
            : [...state.cart, { ...item, quantity: 1 }]
        }))
      }
      // console.log(get().cart)
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
    clearCart: () => {
      set({ cart: [] })
    },

    setPaymentMode: (paymentMode) => set({ paymentMode }),
    setFilter: (filter) => set({ filter }),
    setType: (type) => set({ type })
  })