import {CURRENCY, LOCALE} from '../config';

const useFormat = () => {
  const currencyFormatter = () =>
    new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: CURRENCY,
    });

  const dateFormatter = () => new Intl.DateTimeFormat(LOCALE);
  const hourFormatter = () =>
    new Intl.DateTimeFormat(LOCALE, {
      hour: 'numeric',
      minute: 'numeric',
    });

  return [currencyFormatter, dateFormatter, hourFormatter] as const;
};

export default useFormat;
