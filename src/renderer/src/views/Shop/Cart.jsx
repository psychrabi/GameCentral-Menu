import { useAuthStore } from '../../components/stores/AuthStore'
import { useProductStore } from '../../components/stores/ProductStore'
import { PaymentModes } from '../../components/ui/PaymentModes'
import { formatCurrency } from '../../utils/formatCurrency'

const Cart = () => {
  const member = useAuthStore((state) => state.member)
  const checkOut = useProductStore((state) => state.checkOut)
  const clearCart = useProductStore((state) => state.clearCart)
  const removeFromCart = useProductStore((state) => state.removeFromCart)
  const cart = useProductStore((state) => state.cart)
  const addToCart = useProductStore((state) => state.addToCart)
  const taxRate = useProductStore((state) => state.taxRate)
  const subTotal = useProductStore((state) => state.subTotal)
  const tax = useProductStore((state) => state.tax)
  const total = useProductStore((state) => state.total)

  return (
    <div className="w-25 sticky-top overflow-y z-0">
      <div className="border-bottom mb-2 py-2 d-flex justify-content-between">
        <h2 className="h3 pb-1 mb-0">Cart</h2>
        <button
          className={'btn btn-danger text-light'}
          title={'Clear cart'}
          type={'button'}
          onClick={() => clearCart()}
        >
          <i className={'bi bi-trash'}></i>
        </button>
      </div>
      <div className="cart no-scrollbar">
        <table className="table table-sm mb-2">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" className="text-center">
                Qty
              </th>

              <th scope="col" className="text-end">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="align-middle">
                  <p className="mb-0 fw-semibold">{item.name}</p>
                </td>
                <td className="align-middle ">
                  <div className="d-flex flex-row justify-content-center">
                    <button className="btn btn-link px-0" onClick={() => removeFromCart(item.id)}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="border rounded px-2 pt-1">{item.quantity}</span>
                    <button className="btn btn-link px-0" onClick={() => addToCart(item.id)}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </td>
                <td className="align-middle text-end">
                  <p className="mb-0  fw-semibold">{formatCurrency(item.sales_price.toFixed(2))}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card-body p-0">
          <div>
            <div className="pb-0">
              <PaymentModes />
            </div>
            <hr className="my-2" />

            <div className="pb-3">
              <div className="d-flex justify-content-between">
                <p className="mb-2  fw-semibold">Subtotal</p>
                <p className="mb-2">{formatCurrency(subTotal())}</p>
              </div>

              <div className="d-flex justify-content-between">
                <p className="mb-0  fw-semibold">Tax ({taxRate * 100}%)</p>
                <p className="mb-0">{formatCurrency(tax())}</p>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between mb-4">
                <p className="mb-2  fw-semibold">Total</p>
                <p className="mb-2">{formatCurrency(total())}</p>
              </div>
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-primary btn-lg text-center"
                  onClick={() => checkOut(member.id, subTotal, tax, total)}
                >
                  <span>Submit order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
