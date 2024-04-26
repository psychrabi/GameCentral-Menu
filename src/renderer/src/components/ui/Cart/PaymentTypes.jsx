import React, { useMemo } from 'react'
import PaymentModes from '../../../data/PaymentModes.js'
import { useBoundStore } from '../../stores/BoundStore.js'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const PaymentTypes = () => {
  const { setPaymentMode, paymentMode } = useBoundStore((state) => ({
    setPaymentMode: state.setPaymentMode,
    paymentMode: state.paymentMode
  }))

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value)
  }

  const activePaymentModes = useMemo(() => PaymentModes.filter((mode) => mode.active), [])

  return (
    <FormControl sx={{ my: 2 }}>
      <FormLabel id="paymentMode-label">Payment Options</FormLabel>
      <RadioGroup
        aria-labelledby="paymentMode-label"
        name="paymentMode"
        value={paymentMode}
        onChange={(event) => handlePaymentModeChange(event)}
      >
        {activePaymentModes.map((item) => (
          <FormControlLabel
            value={item.category}
            control={<Radio />}
            label={item.description}
            key={item.id}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default PaymentTypes
