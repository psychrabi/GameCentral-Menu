import PropTypes from 'prop-types'
import { useBoundStore } from '../../components/stores/BoundStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import React from 'react';

const Product = React.memo(({ product }) => {
  const addToCart = useBoundStore((state) => state.addToCart);

  const handleAddToCart = (id) => addToCart(id);

  return (
    <div className="product card">
      <LazyLoadImage
        src={product.product_image}
        alt={product.name}
        className="card-img-top"
        loading="lazy"
      />
      <div className="card-body d-flex flex-col justify-between">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text price">{formatCurrency(product.sales_price)}</p>
        {product.stock > 0 ? (
          <button className="btn btn-primary add-to-cart" onClick={() => handleAddToCart(product.id)}>
            <i className="bi bi-cart-plus text-lg"></i>
          </button>
        ) : (
          <button className="btn btn-secondary add-to-cart" disabled>
            Not in Stock
          </button>
        )}
      </div>
    </div>
  );
});

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    product_image: PropTypes.any,
    sales_price: PropTypes.number,
    stock: PropTypes.number
  })
}

export default Product
