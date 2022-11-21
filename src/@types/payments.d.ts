interface PaymentStrategy {
  pay(amount: number): void;
}

enum PaymentMethods {
  cash,
  debit,
  transfer,
  paypal,
}

export {PaymentStrategy, PaymentMethods};
