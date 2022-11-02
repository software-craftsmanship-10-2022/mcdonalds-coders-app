import {LOCALE, CURRENCY} from '../config';

const useFormat = () => {
  const currencyFormatter = () => new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
  });

  const dateFormatter = () => new Intl.DateTimeFormat(LOCALE);

  return [currencyFormatter, dateFormatter] as const;
};

export default useFormat;
