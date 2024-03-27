import React, { useMemo } from 'react';
import PaymentModes from '../../data/PaymentModes.js';
import { useBoundStore } from '../stores/BoundStore';

export const PaymentTypes = React.memo(() => {
  const setPaymentMode = useBoundStore((state) => state.setPaymentMode)

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const activePaymentModes = useMemo(() => PaymentModes.filter((mode) => mode.active), []);

  return (
    <div>
      {activePaymentModes.map((mode) => (
        <div className="d-flex flex-row pb-1" key={mode.id}>
          <div className="d-flex align-items-center px-2">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id={`radioNoLabel${mode.id}`}
              value={mode.category}
              aria-label="..."
              onChange={handlePaymentModeChange}
              defaultChecked={mode.default}
            />
          </div>
          <div className="rounded border w-100 px-2 py-1">
            <label
              htmlFor={`radioNoLabel${mode.id}`}
              className="d-flex align-items-center mb-0 fw-semibold"
            >
              <i className={`${mode.icon} text-dark pe-2`}></i>
              {mode.description}
            </label>
          </div>
        </div>
      ))}
    </div>
  )
})
