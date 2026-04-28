const getLocale = (currency: string) => {
  switch (currency.toLowerCase()) {
    case 'try': return 'tr-TR';
    case 'eur': return 'de-DE';
    case 'usd': default: return 'en-US';
  }
};

export const formatCurrency = (amount: number, currencyCode: string = 'usd') => {
  return new Intl.NumberFormat(getLocale(currencyCode), {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};