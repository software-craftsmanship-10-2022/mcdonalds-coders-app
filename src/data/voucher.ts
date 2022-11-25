import {VoucherTypes} from 'src/Payment/models/Voucher/VoucherTypes';
import type {VoucherApiType} from '../@types/payments';

export const VOUCHERS: VoucherApiType[] = [
  {
    code: 'MENOS30',
    type: VoucherTypes.fixed,
    discount: 30,
    expirationDate: new Date('2030-01-01T00:00:00'),
  },
  {
    code: 'ANTES-MOLABAS',
    type: VoucherTypes.percentage,
    discount: 10,
    expirationDate: new Date('2000-01-01T00:00:00'),
  },
  {
    code: 'BOOM',
    type: VoucherTypes.total,
    discount: 0,
    expirationDate: new Date('2030-01-01T00:00:00'),
  },
  {
    code: '10%',
    type: VoucherTypes.percentage,
    discount: 0,
    expirationDate: new Date('2030-01-01T00:00:00'),
  },
];
