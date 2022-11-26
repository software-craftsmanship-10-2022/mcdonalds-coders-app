import {Voucher} from 'src/Payment/models/Voucher/Voucher';
import {VOUCHERS} from '../../../../../data/voucher';

export const searchVoucherByCode = async (voucherCode: string): Promise<Voucher> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(getVoucherFromAppData(voucherCode));
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

const getVoucherFromAppData = (voucherCode: string): Voucher => {
  if (typeof voucherCode !== 'string') {
    throw new Error();
  }

  const voucherApi = VOUCHERS.find(
    (voucher) => voucher.code.toUpperCase() === voucherCode.toUpperCase(),
  );

  if (!voucherApi) {
    throw new Error('El código introducido no es correcto');
  }

  if (voucherApi.expirationDate < new Date()) {
    throw new Error('El código introducido está caducado');
  }

  return new Voucher(voucherApi);
};
