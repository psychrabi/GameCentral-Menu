const PaymentModes = [
  {
    id: 1,
    category: 'credit-card',
    description: 'Credit Card',
    active: false,
    icon: 'bi bi-credit-card',
    default: false
  },
  {
    id: 2,
    category: 'balance',
    description: 'Balance',
    active: true,
    icon: 'bi bi-bank',
    default: true
  },
  {
    id: 3,
    category: 'cash',
    description: 'Cash',
    active: true,
    icon: 'bi bi-cash',
    default: false
  },
  {
    id: 4,
    category: 'paypal',
    description: 'PayPal',
    active: false,
    icon: 'bi bi-paypal',
    default: false
  },
  {
    id: 5,
    category: 'google-pay',
    description: 'Google Pay',
    active: false,
    icon: 'bi bi-google',
    default: false
  }
]

export default PaymentModes
