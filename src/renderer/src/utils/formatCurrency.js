const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency'
})
export function formatCurrency(number) {
  if (typeof number !== 'number' || isNaN(number)) {
    throw new Error('Input must be a valid number');
  }
  return CURRENCY_FORMATTER.format(number);
}
