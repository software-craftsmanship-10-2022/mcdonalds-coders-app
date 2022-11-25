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
  discount(amount: number);
}

export enum VoucherTypes {
  percentage,
  total,
  fixed,
}

export type VoucherApiType = {
  code: string;
  type: VoucherTypes;
  discount: number;
  expirationDate: Date;
};

export {type PaymentStrategy, PaymentMethods};
