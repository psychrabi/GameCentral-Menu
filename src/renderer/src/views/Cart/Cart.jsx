import {
  Box,
  Button,
  Card,
  Divider
} from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import { PaymentTypes } from '../../components/ui/Cart/PaymentTypes'
import CartItem from '../../components/ui/Cart/CartItem'
import CartTotal from '../../components/ui/Cart/CartTotal'

const Cart = () => {
  const { checkOut, clearCart, cart, setTitle, setCount } = useBoundStore((state) => ({
    checkOut: state.checkOut,
    clearCart: state.clearCart,
    cart: state.cart,
    setTitle: state.setTitle,
    setCount: state.setCount
  }))

  useEffect(() => {
    setTitle('Cart')
    setCount(cart.length)
  }, [cart.length])

  // Optimized list items to prevent unnecessary re-renders
  const cartItems = useMemo(
    () => cart.map((item) => <CartItem key={item.id} item={item} />),
    [cart]
  )

  return (
    <>
      <Box sx={{ display: 'flex', px: 2, gap: 2 }}>
        <Box
          flexGrow={1}
          sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}
        >
          {cartItems}
        </Box>
        {/* Checkout section */}
        <Card sx={{ p: 3, width: 300 }}>
          <CartTotal />
          <Divider />

          <PaymentTypes />

          <Button
            size="large"
            variant="contained"
            color="success"
            fullWidth
            onClick={() => checkOut()}
          >
            Proceed to Checkout
          </Button>
          <Button
            size="large"
            variant="contained"
            color="error"
            fullWidth
            onClick={() => clearCart()}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </Card>
      </Box>
    </>
  )
}

export default Cart
