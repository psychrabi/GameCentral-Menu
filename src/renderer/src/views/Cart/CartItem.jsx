import { useBoundStore } from '../../components/stores/BoundStore'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartItem({ item }) {
  const { addToCart, removeFromCart } = useBoundStore((state) => state)
  console.log(item)
  return (
    <div className="cart-item d-flex align-items-center mb-2">
      <div className="flex-shrink-0">
        <img src={item.product_image} alt={item.name} className="object-fill-cover" />
      </div>
      <div className="flex-grow-1 ms-3 d-flex flex-column">
        <h2 className="cart-item-title">Product Title</h2>
        <p className="cart-item-price">{formatCurrency(item.sales_price)}</p>
        <p className="cart-item-quantity">Quantity: {item.quantity}</p>
      </div>
    </div>
  )
}
