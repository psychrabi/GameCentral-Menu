import { fetchData } from '../../utils/fetchData'

export const createProductSlice = (set, get) => ({
  filter: '',
  products: [],
  cart: [],
  singleProduct: {},
  type: '',
  paymentMode: '',
  taxRate: 0.15, // 15% by default
  show: false,
  loading: false,
  notification: null,
  error: null,
  messages: '',
  alert: '',
  fetchProducts: async (centerId, token) => {
    set({ loading: true });
    try {
      const products = await fetchData(`/clientProducts/${centerId}`, token);
      set({ error: null, products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchSingleProduct: async (id, token) => {
    set({ loading: true });
    try {
      const response = await fetchData(`/products/${id}`, token);
      set({
        singleProduct: response.data,
        loading: false
      });
    } catch (error) {
      set({ error: error.message, loading: false });
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
    const { products, cart } = get();
    const itemIndex = products.findIndex((product) => product.id === id);
    const cartItemIndex = cart.findIndex((item) => item.id === id);

    if (cartItemIndex > -1) {
      const item = cart[cartItemIndex];
      if (item.quantity < products[itemIndex].stock) {
        set((state) => {
          state.cart[cartItemIndex].quantity += 1;
          return { cart: [...state.cart] };
        });
      } else {
        set({ messages: 'Product quantity exceed', alert: 'danger' });
      }
    } else {
      const newItem = { ...products[itemIndex], quantity: 1 };
      set((state) => ({ cart: [...state.cart, newItem] }));
    }
  },
  removeFromCart: (id) => {
    const { cart } = get();
    const itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex > -1) {
      const item = cart[itemIndex];
      if (item.quantity > 1) {
        set((state) => {
          state.cart[itemIndex].quantity -= 1;
          return { cart: [...state.cart] };
        });
      } else {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id)
        }));
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