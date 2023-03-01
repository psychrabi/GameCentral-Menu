import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Header from '../../components/ui/Header'
import categories from '../../data/ProductTypes.json'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage'
import Cart from './Cart'
import Products from './Products'

export default function Shop() {
  const [paymentMode, setPaymentMode] = useState('balance')

  const getProducts = useDataStore((state) => state.fetchProducts)
  const productsList = useDataStore((state) => state.products)

  const filter = useDataStore((state) => state.filter)
  const member = useAuthStore((state) => state.member)

  useEffect(() => {
    getProducts(member)
  }, [])

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) ?? [])
  // const [state, dispatch] = useReducer(reducer, { cart: storedCart || [] });

  // const updateFilteredProducts = (productsList, productType, search) => {
  //   if (productType !== '') {
  //     return sortByName(productsList.filter((g) => g.product_type === productType))
  //   } else if (search !== '') {
  //     return sortByName(
  //       productsList.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
  //     )
  //   } else {
  //     return sortByName(productsList)
  //   }
  // }

  const onAdd = (product) => {
    const exists = cartItems.find((item) => item.id === product.id)
    if (exists) {
      const newQuantity = exists.quantity + 1
      if (newQuantity > exists.stock) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id ? { ...exists, quantity: exists.stock } : item
          )
        )
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id ? { ...exists, quantity: newQuantity } : item
          )
        )
      }
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
    if (product.stock === 0) {
      return
    }
  }

  const onRemove = (product) => {
    const exists = cartItems.find((item) => item.id === product.id)
    if (exists.quantity == 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exists, quantity: exists.quantity - 1 } : item
        )
      )
    }
    if (product.stock === 0) {
      return
    }
  }

  const onClear = () => {
    setCartItems([])
    localStorage.removeItem('cartItems')
  }

  const handlePaymentModeChange = useCallback((event) => {
    setPaymentMode(event.target.value)
  }, [])

  const handleSubmitOrder = useCallback(() => {
    alert(`You have ${cartItems.length} items on cart totaling.Are you sure to checkout ?`)
    console.log(paymentMode)
    removeFromLocalStorage('cart')
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <>
      <div className="d-flex">
        <div className={cartItems.length > 0 ? 'w-75 pe-3' : 'w-100'}>
          <Header categories={categories} />

          <Products
            products={productsList?.filter((product) =>
              product.name.toLowerCase().includes(filter.toLowerCase())
            )}
            onAdd={onAdd}
          />
        </div>
        {cartItems.length > 0 ? (
          <Cart
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onClear={onClear}
            handleSubmitOrder={handleSubmitOrder}
            handlePaymentModeChange={handlePaymentModeChange}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}
