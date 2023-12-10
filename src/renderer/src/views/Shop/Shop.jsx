import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import { useProductStore } from '../../components/stores/ProductStore'
import Header from '../../components/ui/Header'
import categories from '../../data/ProductTypes.json'
import Cart from './Cart'
import Products from './Products'

export default function Shop() {
  const { token, member } = useAuthStore()
  const { filter, type } = useDataStore()
  const { fetchProducts, products, cart } = useProductStore()

  useEffect(() => {
    fetchProducts(member.center_id, token)
    // console.log(products)
  }, [])

  return (
    <>
      <div className="d-flex">
        <div className={cart.length > 0 ? 'w-75 pe-3' : 'w-100'}>
          <Header categories={categories} page_title={'All Products'} />
          <Products
            products={products?.filter((product) => {
              if (filter) {
                return product.name.toLowerCase().includes(filter.toLowerCase())
              } else if (type) {
                return product.product_type === type
              } else {
                return true
              }
            })}
          />
        </div>
        {cart.length > 0 ? (
          <Cart
            cart={cart}
            // onClear={onClear}
            // handleSubmitOrder={handleSubmitOrder}
            // handlePaymentModeChange={handlePaymentModeChange}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}
