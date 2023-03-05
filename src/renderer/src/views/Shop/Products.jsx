import PropTypes from 'prop-types'
import Product from './Product'

export default function Products(props) {
  const { products } = props
  return (
    <div className="games" id="installed-games-container">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

Products.propTypes = {
  onAdd: PropTypes.func,
  products: PropTypes.array
}
