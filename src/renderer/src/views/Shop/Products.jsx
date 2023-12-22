import PropTypes from 'prop-types'
import Product from './Product'
import { useEffect } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'

export default function Products({ products }) {
  const setCount = useBoundStore((state) => state.setCount)

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
