const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency'
})
export const formatCurrency = (number) => {
  if (Number.isNaN(Number(number))) {
    throw new Error('Input must be a valid number');
  }
  return CURRENCY_FORMATTER.format(number);
}
