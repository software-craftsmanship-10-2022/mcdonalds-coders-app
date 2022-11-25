import type {VoucherStrategy} from 'src/@types/payments';

export class TotalVoucherStrategy implements VoucherStrategy {
  calculateDiscount(amount: number): number {
    return 0;
  }
}
