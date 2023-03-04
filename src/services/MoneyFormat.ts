import { Locale } from './Locale';
export const MoneyFormat = (money: number) => {
  const moneyWithCents = money / 100;
  return new Intl.NumberFormat(Locale[0].languageCode, {
    style: 'currency',
    currency: Locale[0].currencyCode,
  }).format(moneyWithCents);
};
