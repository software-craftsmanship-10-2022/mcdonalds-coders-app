import type {VoucherStrategy} from 'src/@types/payments';

export class FixedVoucherStrategy implements VoucherStrategy {
  #discount: number;
  constructor(discount: number) {
    this.#discount = discount;
  }

  calculateDiscount(amount: number): number {
    return this.#discount > amount ? amount : this.#discount;
  }

  useDiscount(amount: number): number {
    const result = amount - this.calculateDiscount(amount);
    return result > 0 ? result : 0;
  }

  getDiscountString(): string {
    return `${this.#discount}`;
  }
}
