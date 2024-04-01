import { useEffect, useMemo } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import { PaymentTypes } from '../../components/ui/PaymentTypes'
import { formatCurrency } from '../../utils/formatCurrency'
import CartItem from './CartItem'

const Cart = () => {
  const { member, checkOut, clearCart, cart, taxRate, subTotal, tax, total, setTitle, setCount } =
    useBoundStore((state) => ({
      member: state.member,
      checkOut: state.checkOut,
      clearCart: state.clearCart,
      cart: state.cart,
      taxRate: state.taxRate,
      subTotal: state.subTotal(),
      tax: state.tax(),
      total: state.total(),
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
      <section className="row">
        <div className="col-9">{cartItems}</div>
        {/* Checkout section */}
        <aside className="col-3">
          <>Subtotal: {formatCurrency(subTotal)}</>
          <h4>Tax (13%): {formatCurrency(tax)}</h4>
          <h4>Total: {formatCurrency(total)}</h4>

          <h5 className="mt-5">Payment Options:</h5>
          <div className="payment-options">
            <label>
              <input type="radio" name="payment" value="credit-card" /> Credit Card
            </label>
            <label>
              <input type="radio" name="payment" value="paypal" /> PayPal
            </label>
          </div>

          <button className="btn btn-primary btn-lg mt-3">Proceed to Checkout</button>
        </aside>
      </section>
    </>
  )
}

export default Cart
