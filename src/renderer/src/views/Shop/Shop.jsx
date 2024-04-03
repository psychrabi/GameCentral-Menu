import { lazy, useEffect } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import ProductTypes from '../../data/ProductTypes.js'

import { useMemo } from 'react'
import Product from './Product.jsx'
import { Box } from '@mui/material'

export default function Shop() {
  const {
    token,
    member,
    filter,
    type,
    setCount,
    fetchProducts,
    products,
    setFilter,
    setType,
    setTitle,
    cart,
    setGameTypes
  } = useBoundStore((state) => ({
    token: state.token,
    member: state.member,
    filter: state.filter,
    type: state.type,
    setCount: state.setCount,
    fetchProducts: state.fetchProducts,
    products: state.products,
    setFilter: state.setFilter,
    setType: state.setType,
    setTitle: state.setTitle,
    cart: state.cart,
    setGameTypes: state.setGameTypes
  }))

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(member.center_id, token)
    }
    setFilter('')
    setType('')
    setTitle('All Products')
    setGameTypes(ProductTypes)
  }, [
    member.center_id,
    token,
    products.length,
    fetchProducts,
    setFilter,
    setType,
    setTitle,
    ProductTypes
  ])

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const productNameLower = product.name.toLowerCase()
        const filterLower = filter.toLowerCase()
        return filter
          ? productNameLower.includes(filterLower)
          : type
            ? product.product_type === type
            : true
      }),
    [products, filter, type]
  )

  useEffect(() => {
    setCount(filteredProducts.length)
  }, [filteredProducts.length, setCount])

  return (
    <>
      <Box className="products" px={2}>
        {filteredProducts?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Box>
    </>
  )
}
