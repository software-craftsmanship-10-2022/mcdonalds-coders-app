import type {VoucherApiType, VoucherStrategy} from 'src/@types/payments';
import {VoucherTypes} from 'src/@types/payments';
import {FixedVoucherStrategy} from './FixedVoucherStrategy';
import {PercentageVoucherStrategy} from './PercentageVoucherStrategy';
import {TotalVoucherStrategy} from './TotalVoucherStrategy';

export class Voucher {
  code: string;
  #voucherStrategy: VoucherStrategy;

  constructor(voucherApi: VoucherApiType) {
    this.code = voucherApi.code;
    this.#voucherStrategy = voucherStrategyFactory(voucherApi);
  }

  calculateDiscount(amount: number): number {
    return this.#voucherStrategy.calculateDiscount(amount);
  }

  useDiscount(amount: number): number {
    return this.#voucherStrategy.useDiscount(amount);
  }
}

const voucherStrategyFactory = (voucherApi: VoucherApiType): VoucherStrategy => {
  switch (voucherApi.type) {
    case VoucherTypes.fixed:
      return new FixedVoucherStrategy(voucherApi.discount);
    case VoucherTypes.percentage:
      return new PercentageVoucherStrategy(voucherApi.discount);
    case VoucherTypes.total:
      return new TotalVoucherStrategy();
    default:
      throw new Error('Invalid voucher type');
  }
};
