import React from 'react'
import Product from './Product'

export default function Products(props) {
  const { products, onAdd } = props
  return (
    <div className="games" id="installed-games-container">
      {products.map((product) => (
        <Product key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  )
}
