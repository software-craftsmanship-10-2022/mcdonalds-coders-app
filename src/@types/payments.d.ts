interface PaymentStrategy {
  pay(amount: number): void;
}

enum PaymentMethods {
  cash,
  debit,
  transfer,
  paypal,
}

export interface VoucherStrategy {
  calculateDiscount(amount: number): number;
  useDiscount(amount: number): number;
  getDiscountString(): string;
}

export type VoucherApiType = {
  code: string;
  type: VoucherTypes;
  discount: number;
  expirationDate: Date;
};

export {type PaymentStrategy, PaymentMethods};
