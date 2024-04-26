import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ShareIcon from '@mui/icons-material/Share'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'

import { CardContent, Typography } from '@mui/material'
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
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <CardMedia component="img" image={product.product_image} alt={product.name} />
      <Card
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="body1">
            {product.name}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => handleAddToCart(product.id)}>
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Card>
  )
})

export default Product
