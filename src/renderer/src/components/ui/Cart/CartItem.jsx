import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useBoundStore } from '../../stores/BoundStore'
import { formatCurrency } from '../../../utils/formatCurrency'

export default function CartItem({ item }) {
  const { addToCart, removeFromCart } = useBoundStore((state) => state)
  console.log(item)
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        image={item.product_image}
        alt={item.name}
        sx={{ height: 160, width: '120px' }}
      />
      <Box flexGrow={1}>
        <CardContent sx={{ px: 2, pb: 1 }}>
          <Typography variant="h4" className="cart-item-title">
            Product Title
          </Typography>
          <Typography variant="body1" className="cart-item-price">
            {formatCurrency(item.sales_price)}
          </Typography>
          <Typography variant="body1" className="cart-item-quantity">
            Quantity: {item.quantity}
          </Typography>
        </CardContent>
        <ButtonGroup sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button aria-label="add-to-cart" onClick={() => addToCart(item.id)}>
            <AddShoppingCartIcon />
          </Button>
          <Button aria-label="remove-from-cart" onClick={() => removeFromCart(item.id)}>
            <RemoveShoppingCartIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  )
}
