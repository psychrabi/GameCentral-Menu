import React, { useMemo, useState } from 'react'
import PaymentModes from '../../../data/PaymentModes.js'
import { useBoundStore } from '../../stores/BoundStore.js'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
export const PaymentTypes = React.memo(() => {
  const { setPaymentMode, paymentMode } = useBoundStore((state) => ({
    setPaymentMode: state.setPaymentMode,
    paymentMode: state.paymentMode
  }))
  const [value, setValue] = useState('female')

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value)
  }

  const activePaymentModes = useMemo(() => PaymentModes.filter((mode) => mode.active), [])

  return (
    <FormControl sx={{ my: 2 }}>
      <FormLabel id="demo-radio-buttons-group-label">Payment Options</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={paymentMode}
        onChange={handlePaymentModeChange}
      >
        {activePaymentModes.map((mode) => (
          <FormControlLabel value={mode.category} control={<Radio />} label={mode.description} key={mode.id}/>
        ))}
      </RadioGroup>
    </FormControl>
  )
})
