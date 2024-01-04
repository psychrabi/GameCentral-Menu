import { lazy, useEffect } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
const Header = lazy(() => import('../../components/ui/Header'))
const Cart = lazy(() => import('./Cart'))
const Products = lazy(() => import('./Products'))

import ProductTypes from '../../data/ProductTypes.js'

export default function Shop() {
  const token = useBoundStore((state) => state.token)
  const member = useBoundStore((state) => state.member)
  const filter = useBoundStore((state) => state.filter)
  const type = useBoundStore((state) => state.type)
  const setCount = useBoundStore((state) => state.setCount)
  const fetchProducts = useBoundStore((state) => state.fetchProducts)
  const products = useBoundStore((state) => state.products)
  const setFilter = useBoundStore((state) => state.setFilter)
  const cart = useBoundStore((state) => state.cart)
  const setType = useBoundStore((state) => state.setType)
  const setTitle = useBoundStore((state) => state.setTitle)

  useEffect(() => {
    if (!products.length > 0) {
      fetchProducts(member.center_id, token)
    }
    setFilter('')
    setType('')
    setTitle('All Products')
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
          <Header categories={ProductTypes} page_title={'All Products'} />
          <Products products={filteredProducts} />
        </div>
        {cart.length > 0 ? <Cart cart={cart} /> : ''}
      </div>
    </>
  )
}
