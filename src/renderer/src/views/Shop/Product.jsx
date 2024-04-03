import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ShareIcon from '@mui/icons-material/Share'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'

import PropTypes from 'prop-types'
import * as React from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'

const Product = React.memo(({ product }) => {
  const [expanded, setExpanded] = React.useState(false)

  const { addToCart, cart } = useBoundStore((state) => ({
    addToCart: state.addToCart,
    cart: state.cart,
    setMessages: state.setMessages,
    setAlert: state.setAlert
  }))
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleAddToCart = (id) => {
    addToCart(id)
  }

  const isProductInCart = cart.some(
    (item) => item.id === product.id && item.quantity >= product.stock
  )

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardHeader subheader={product.name} />
      <CardMedia component="img" height="194" image={product.product_image} alt={product.name} />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleAddToCart(product.id)}>
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
})

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
