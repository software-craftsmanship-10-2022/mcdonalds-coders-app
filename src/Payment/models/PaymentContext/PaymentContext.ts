import type {PaymentStrategy} from 'src/@types/payments';

class PaymentContext {
  strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  pay(amount: number) {
    this.strategy.pay(amount);
  }
}

export default PaymentContext;

// Implementation example
// const debitCard = new Debit(new Card('123456', '22/11', 234));
// const payment = new PaymentContext(debitCard);
// payment.pay(100);
