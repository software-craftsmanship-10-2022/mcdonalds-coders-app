interface PaymentStrategy {
  pay(amount: number): void;
}

enum PaymentMethods {
  cash,
  debit,
  transfer,
  paypal,
}

interface VoucherStrategy {
  discount(amount: number);
}

export {type PaymentStrategy, PaymentMethods};
