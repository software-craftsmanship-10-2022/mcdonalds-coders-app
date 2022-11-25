import type {VoucherStrategy} from 'src/@types/payments';

export class FixedVoucherStrategy implements VoucherStrategy {
  #discount: number;
  constructor(discount: number) {
    this.#discount = discount;
  }

  calculateDiscount(amount: number): number {
    const result = amount - this.#discount;
    return result > 0 ? result : 0;
  }
}
