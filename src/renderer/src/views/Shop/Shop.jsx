import { useCallback, useEffect, useMemo, useState } from 'react'
// import products from "../../../data/Products.json";
import { useStateContext } from '../../components/contexts/ContextProvider'
import Header from '../../components/ui/Header'
import categories from '../../data/ProductTypes.json'
import axiosClient from '../../lib/axios-client'
import { removeFromLocalStorage } from '../../utils/removeFromLocalStorage'
import { saveToLocalStorage } from '../../utils/saveToLocalStorage'
import { sortByName } from '../../utils/sortByName'
import Cart from './Cart'
import Products from './Products'
import { addDataIntoCache } from '../../utils/addDataIntoCache'
import useFilter from '../../utils/useFilter'

export default function Shop() {
  const [loading, setLoading] = useState(false)

  // Store the filtered list of products in a separate variable
  const [productsList, setProductsList] = useState(
    sortByName(JSON.parse(localStorage.getItem('products')))
  )
  const { setSearch, setType, filteredList } = useFilter(productsList, categories, 'product_type')

  const [paymentMode, setPaymentMode] = useState('balance')

  // Use useState to store the current app, the list of apps, and the show state

  // Use useState to store the product type and the title
  const [title, setHeader] = useState(['All Products'])

  // Use useState to store the app count
  const count = useMemo(() => filteredList.length, [filteredList])

  const handleCategoriesChange = useCallback((event) => {
    setType(event.target.value)
    let index = event.target.selectedIndex
    setHeader(event.target[index].text)
  }, [])

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem('member'))
    if (!localStorage.getItem('products')) {
      setLoading(true)
      try {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + member.token
        axiosClient.get(`/clientProducts/${member.center_id}`).then(({ data }) => {
          addDataIntoCache(
            'products',
            `http://gamecentralmenu.test/api/clientProducts/${member.center_id}`,
            data
          )

          setProductsList(data)
          if (localStorage.getItem('products') == null) {
            localStorage.setItem('products', JSON.stringify(data))
          }
          setCount(data.length)
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
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

  const handleSearch = (search) => {
    setType('')
    setSearch(search)
  }

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
          handleSearch={handleSearch}
        />
        <Products products={filteredList} onAdd={onAdd} />
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
  )
}
