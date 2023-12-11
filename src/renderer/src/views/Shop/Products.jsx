import PropTypes from 'prop-types'
import Product from './Product'
import { useEffect } from 'react'
import { useDataStore } from '../../components/stores/DataStore'

export default function Products({ products }) {
  const { setCount } = useDataStore()

  useEffect(() => {
    // Update the count whenever games or the filter changes
    setCount(products?.length)
  }, [])
  return (
    <div className="products" id="installed-games-container">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

Products.propTypes = {
  products: PropTypes.array
}
