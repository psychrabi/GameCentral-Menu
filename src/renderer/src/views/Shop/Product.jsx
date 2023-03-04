import PropTypes from 'prop-types'
import { formatCurrency } from '../../utils/formatCurrency'

const Product = ({ product, onAdd }) => {
  return (
    <div className="product card" key={product.id}>
      <img src={product.product_image} alt={product.name} className="card-img-top" loading="lazy" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text price">{formatCurrency(product.sales_price)}</p>
        {product.stock > 0 && (
          <button className="btn btn-primary add-to-cart" onClick={() => onAdd(product)}>
            Add to Cart
          </button>
        )}

        {product.stock == 0 && (
          <button className="btn btn-secondary add-to-cart">Not in Stock</button>
        )}
      </div>
    </div>
  )
}

Product.propTypes = {
  onAdd: PropTypes.func,
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    product_image: PropTypes.any,
    sales_price: PropTypes.number,
    stock: PropTypes.number
  })
}

export default Product
