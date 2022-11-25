import {VOUCHERS} from '../../../../../data/voucher';

export const searchVoucherByCode = async (voucherCode: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(getVoucherFromAppData(voucherCode));
      } catch (error) {
        reject((error as Error).message);
      }
    }, 500);
  });
};

const getVoucherFromAppData = (voucherCode: string) => {
  if (typeof voucherCode !== 'string') {
    throw new Error();
  }

  const voucher = VOUCHERS.find((voucher) => voucher.code === voucherCode);

  if (!voucher) {
    throw new Error('El código introducido no es correcto');
  }

  if (voucher.expirationDate < new Date()) {
    throw new Error('El código introducido está caducado');
  }

  return voucher;
};
