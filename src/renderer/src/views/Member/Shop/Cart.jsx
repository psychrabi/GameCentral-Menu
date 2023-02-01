import PropTypes from 'prop-types'
import PaymentModes from '../../../data/PaymentModes.json'

const Cart = ({
  cartItems,
  onAdd,
  onRemove,
  onClear,
  handlePaymentModeChange,
  handleSubmitOrder
}) => {
  const itemsPrice = parseFloat(
    cartItems.reduce((acc, item) => acc + item.sales_price * item.quantity, 0)
  ).toFixed(2)
  const taxPrice = parseFloat(itemsPrice * 0.13).toFixed(2)
  const totalPrice = parseFloat(itemsPrice + taxPrice).toFixed(2)

  if (cartItems.length > 0) {
    return (
      <div className="w-25 sticky-top overflow-y z-0">
        <div className="border-bottom mb-2 py-2 d-flex justify-content-between">
          <h2 className="h3 pb-1 mb-0">Cart</h2>
          <button
            className={'btn btn-danger text-light'}
            title={'Clear cart'}
            type={'button'}
            onClick={() => onClear()}
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
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">
                    <p className="mb-0 fw-semibold">{item.name}</p>
                  </td>
                  <td className="align-middle ">
                    <div className="d-flex flex-row justify-content-center">
                      <button className="btn btn-link px-0" onClick={() => onRemove(item)}>
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="border rounded px-2 pt-1">{item.quantity}</span>
                      <button className="btn btn-link px-0" onClick={() => onAdd(item)}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td className="align-middle text-end">
                    <p className="mb-0  fw-semibold">{item.sales_price.toFixed(2)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-body p-0">
            <div>
              <div className="pb-0">
                {PaymentModes.map((mode, key) => {
                  return mode.active ? (
                    <div className="d-flex flex-row pb-1" key={key}>
                      <div className="d-flex align-items-center px-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="radioNoLabel"
                          id={`radioNoLabel${key}`}
                          value={mode.category}
                          aria-label="..."
                          onChange={handlePaymentModeChange}
                        />
                      </div>
                      <div className="rounded border w-100 px-2 py-1">
                        <p className="d-flex align-items-center mb-0 fw-semibold">
                          <i className="bi bi-credit-card text-dark pe-2 "></i>
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ''
                  )
                })}
              </div>
              <hr className="my-2" />

              <div className="pb-3">
                <div className="d-flex justify-content-between">
                  <p className="mb-2  fw-semibold">Subtotal</p>
                  <p className="mb-2">${itemsPrice}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="mb-0  fw-semibold">Tax ({0.13 * 100}%)</p>
                  <p className="mb-0">{taxPrice}</p>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between mb-4">
                  <p className="mb-2  fw-semibold">Total</p>
                  <p className="mb-2">${totalPrice}</p>
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg text-center"
                    onClick={handleSubmitOrder}
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
}

Cart.propTypes = {
  cartItems: PropTypes.array,
  handlePaymentModeChange: PropTypes.any,
  handleSubmitOrder: PropTypes.any,
  onAdd: PropTypes.func,
  onClear: PropTypes.func,
  onRemove: PropTypes.func
}
export default Cart
