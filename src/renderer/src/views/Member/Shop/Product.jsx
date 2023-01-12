// import PropTypes from "prop-types";

const Product = (props) => {
  const { product, onAdd } = props

  // Product.propTypes = {
  //   id: PropTypes.string,
  //   name: PropTypes.string,
  //   product_image: PropTypes.string,
  //   sales_price: PropTypes.number,
  //   stock: PropTypes.number,
  //   addToCart: PropTypes.func,
  // };

  return (
    <div className="product card" key={product.id}>
      <img src={product.product_image} alt={product.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text price">${product.sales_price}</p>
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

export default Product
