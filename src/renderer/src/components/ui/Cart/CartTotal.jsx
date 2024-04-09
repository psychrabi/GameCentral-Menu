import { List, ListItem, ListItemText, Divider } from '@mui/material'
import React from 'react'
import { formatCurrency } from '../../../utils/formatCurrency'
import { useBoundStore } from '../../stores/BoundStore'

const CartTotal = () => {
  const { taxRate, subTotal, tax, total } = useBoundStore((state) => ({
    taxRate: state.taxRate,
    subTotal: state.subTotal(),
    tax: state.tax(),
    total: state.total()
  }))

  return (
    <List sx={{ width: '100%', p: 0 }} component="ul">
      <ListItem sx={{ px: 0 }}>
        <ListItemText>Subtotal: </ListItemText>
        {formatCurrency(subTotal)}
      </ListItem>
      <ListItem sx={{ px: 0 }}>
        <ListItemText>Tax ({taxRate * 100} %): </ListItemText>
        {formatCurrency(tax)}
      </ListItem>
      <Divider />
      <ListItem sx={{ px: 0 }}>
        <ListItemText>Total: </ListItemText>
        {formatCurrency(total)}
      </ListItem>
    </List>
  )
}

export default CartTotal
