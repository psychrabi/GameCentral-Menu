import paymentModes from '../../data/PaymentModes.json'
import { useProductStore } from '../stores/ProductStore'

export const PaymentModes = () => {
  const { setPaymentMode } = useProductStore()
  return paymentModes.map((mode, key) => {
    return mode.active ? (
      <div className="d-flex flex-row pb-1" key={key}>
        <div className="d-flex align-items-center px-2">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id={`radioNoLabel${key}`}
            value={mode.category}
            aria-label="..."
            onChange={(ev) => setPaymentMode(ev.target.value)}
          />
        </div>
        <div className="rounded border w-100 px-2 py-1">
          <label
            htmlFor={`radioNoLabel${key}`}
            className="d-flex align-items-center mb-0 fw-semibold"
          >
            <i className={`${mode.icon} text-dark pe-2`}></i>
            {mode.description}
          </label>
        </div>
      </div>
    ) : (
      ''
    )
  })
}
