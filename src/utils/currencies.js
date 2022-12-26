const formatter = new Intl.NumberFormat('en-NP', {
  style: 'currency',
  currency: 'NPR',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 2,
});

export const formatCurrency = val => {
  const num = Number(val) || 0;
  return num && formatter.format(num);
};

export const formatNumber = val => Number(val).toFixed(2);
