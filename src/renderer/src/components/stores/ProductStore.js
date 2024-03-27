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
    set({ loading: true, error: null });
    try {
      const products = await fetchData(`/clientProducts/${centerId}`, token);
      set({ products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchSingleProduct: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchData(`/products/${id}`, token);
      set({ singleProduct: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  checkOut: async (member_id, subTotal, tax, total) => {
    const { cart, paymentMode } = get();
    const payload = {
      member_id,
      items: cart,
      subTotal,
      tax,
      total,
      paymentMode
    }
    console.log(payload)
  },
  subTotal: () => 
    get().cart.reduce((total, item) => total + item.sales_price * item.quantity, 0),
  tax: () => {
    const { subTotal, taxRate } = get();
    return subTotal() * taxRate;
  },
  total: () => {
    const { subTotal, tax } = get();
    return subTotal() + tax();
  },
  addToCart: (id) => {
    const { products, cart } = get();
    const productToAdd = products.find((product) => product.id === id);
    if (!productToAdd) return;

    const cartItemIndex = cart.findIndex((item) => item.id === id);
    if (cartItemIndex > -1) {
      const item = cart[cartItemIndex];
      if (item.quantity < productToAdd.stock) {
        cart[cartItemIndex].quantity += 1;
        set({ cart: [...cart] });
      } else {
        set({ messages: 'Product quantity exceed', alert: 'danger' });
      }
    } else {
      set((state) => ({ cart: [...state.cart, { ...productToAdd, quantity: 1 }] }));
    }
  },
  removeFromCart: (id) => {
    const { cart } = get();
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex === -1) return;

    const item = cart[itemIndex];
    if (item.quantity > 1) {
      cart[itemIndex].quantity -= 1;
      set({ cart: [...cart] });
    } else {
      set({ cart: cart.filter((item) => item.id !== id) });
    }
  },
  clearCart: () => set({ cart: [] }),
  setPaymentMode: (paymentMode) => set({ paymentMode }),
  setFilter: (filter) => set({ filter }),
  setType: (type) => set({ type })
})
