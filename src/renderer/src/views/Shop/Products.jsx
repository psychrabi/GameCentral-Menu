import PropTypes from 'prop-types'
import Product from './Product'
import React, { useEffect, useMemo } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'

export default function Products({ products }) {
  const setCount = useBoundStore((state) => state.setCount)

  // Moved useEffect dependency to prevent unnecessary calls
  useEffect(() => {
    setCount(products?.length)
  }, [products])

  // Use React.memo for Product to prevent unnecessary re-renders
  const MemoizedProduct = useMemo(
    () => products?.map((product) => <Product key={product.id} product={product} />),
    [products]
  )

  return (
    <div className="products" id="installed-games-container">
      {MemoizedProduct}
    </div>
  )
}

Products.propTypes = {
  products: PropTypes.array
}
