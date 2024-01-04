import PaymentModes from '../../data/PaymentModes.js'
import { useBoundStore } from '../stores/BoundStore'

export const PaymentTypes = () => {
  const setPaymentMode = useBoundStore((state) => state.setPaymentMode)

  return PaymentModes.map((mode, key) => {
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
            checked={mode.id === 2}
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
