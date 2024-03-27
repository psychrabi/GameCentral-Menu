import PropTypes from 'prop-types'
import { useBoundStore } from '../../components/stores/BoundStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import React from 'react';

const Product = React.memo(({ product }) => {
  const { addToCart, cart } = useBoundStore((state) => ({
    addToCart: state.addToCart,
    cart: state.cart,
  }));

  const handleAddToCart = (id) => addToCart(id);

  const isProductInCart = cart.some((item) => item.id === product.id && item.quantity >= product.stock);

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
        {product.stock > 0 && !isProductInCart ? (
          <button className="btn btn-primary rounded-circle p-3 lh-1" onClick={() => handleAddToCart(product.id)}>
            <i className="bi bi-cart-plus text-lg"></i>
          </button>
        ) : (
          <button className="btn btn-secondary rounded-circle p-3 lh-1" disabled>
            {isProductInCart ? (<i className="bi bi-cart-x"></i>) : 'Not in Stock'}
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

