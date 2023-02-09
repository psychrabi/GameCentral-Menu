import { useCallback, useEffect, useMemo, useState } from 'react'
// import products from "../../../data/Products.json";
import { useStateContext } from '../../components/contexts/ContextProvider'
import Header from '../../components/ui/Header'
import categories from '../../data/ProductTypes.json'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage'
import { saveToLocalStorage } from '../../utils/saveToLocalStorage'
import { sortByName } from '../../utils/sortByName'
import Cart from './Cart'
import Products from './Products'

export default function Shop() {
  const { search, setSearch } = useStateContext()

  // Store the filtered list of products in a separate variable
  const productsList = useMemo(() => JSON.parse(localStorage.getItem('products')), [])
  const [paymentMode, setPaymentMode] = useState('balance')

  // Use useState to store the current app, the list of apps, and the show state
  const [filteredProducts, setFilteredProducts] = useState(sortByName(productsList))

  // Use useState to store the product type and the title
  const [productType, setProductType] = useState('')
  const [title, setHeader] = useState(['All Products'])

  // Use useState to store the app count
  const [count, setCount] = useState(productsList.length)

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) ?? [])
  // const [state, dispatch] = useReducer(reducer, { cart: storedCart || [] });

  const updateFilteredProducts = (productsList, productType, search) => {
    if (productType !== '') {
      return sortByName(productsList.filter((g) => g.product_type === productType))
    } else if (search !== '') {
      return sortByName(
        productsList.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
      )
    } else {
      return sortByName(productsList)
    }
  }

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

  const handleCategoriesChange = useCallback((event) => {
    setProductType(event.target.value)
    let index = event.target.selectedIndex
    setHeader(event.target[index].text)
  }, [])

  const handlePaymentModeChange = useCallback((event) => {
    setPaymentMode(event.target.value)
  }, [])

  const handleSubmitOrder = useCallback(() => {
    alert(`You have ${cartItems.length} items on cart totaling.Are you sure to checkout ?`)
    console.log(paymentMode)
    removeFromLocalStorage('cart')
  }, [cartItems])

  useEffect(() => {
    // Save the sorted list of apps to local storage when the component mounts
    if (localStorage.getItem('products') == null) {
      saveToLocalStorage('products', productsList)
      console.log('Products saved to localstorage')
    }
  }, [productsList])

  useEffect(() => {
    // Update the filtered apps list when the gameType or search changes
    const newProducts = updateFilteredProducts(productsList, productType, search)
    setFilteredProducts(sortByName(newProducts))
    setCount(newProducts.length)

    // Save the appType to local storage
    saveToLocalStorage('current-selected-type', productType)
  }, [productType, productsList, search])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <div className="d-flex">
      <div className={cartItems.length > 0 ? 'w-75 pe-3' : 'w-100'}>
        <Header
          title={title}
          categories={categories}
          handleCategoriesChange={handleCategoriesChange}
          count={count}
          setSearch={setSearch}
        />
        <Products products={filteredProducts} onAdd={onAdd} />
      </div>
      <Cart
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        onClear={onClear}
        handleSubmitOrder={handleSubmitOrder}
        handlePaymentModeChange={handlePaymentModeChange}
      />
    </div>
  )
}
