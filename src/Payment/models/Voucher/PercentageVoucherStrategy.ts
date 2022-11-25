import type {VoucherStrategy} from 'src/@types/payments';

export class PercentageVoucherStrategy implements VoucherStrategy {
  #discount: number;
  constructor(discount: number) {
    this.#discount = discount;
  }

  calculateDiscount(amount: number): number {
    const result = amount - (amount * this.#discount) / 100;
    return result > 0 ? result : 0;
  }
}
