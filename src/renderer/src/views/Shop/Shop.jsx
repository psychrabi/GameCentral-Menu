import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import { useProductStore } from '../../components/stores/ProductStore'
import Header from '../../components/ui/Header'
import categories from '../../data/ProductTypes.json'
import Cart from './Cart'
import Products from './Products'

export default function Shop() {
  const token = useAuthStore((state) => state.token)
  const member = useAuthStore((state) => state.member)
  const filter = useDataStore((state) => state.filter)
  const type = useDataStore((state) => state.type)
  const setCount = useDataStore((state) => state.setCount)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const products = useProductStore((state) => state.products)
  const setFilter = useProductStore((state) => state.setFilter)
  const cart = useProductStore((state) => state.cart)
  const setType = useProductStore((state) => state.setType)

  useEffect(() => {
    if (!products.length > 0) {
      fetchProducts(member.center_id, token)
    }
    setFilter('')
    setType('')
  }, [])

  const filteredProducts = products?.filter((item) => {
    if (filter) {
      return item.name.toLowerCase().includes(filter.toLowerCase())
    } else if (type) {
      return item.product_type === type
    } else {
      return true
    }
  })

  useEffect(() => {
    setCount(filteredProducts.length)
  }, [filter, type])

  return (
    <>
      <div className="d-flex">
        <div className={cart.length > 0 ? 'w-75 pe-3' : 'w-100'}>
          <Header categories={categories} page_title={'All Products'} />
          <Products products={filteredProducts} />
        </div>
        {cart.length > 0 ? <Cart cart={cart} /> : ''}
      </div>
    </>
  )
}
