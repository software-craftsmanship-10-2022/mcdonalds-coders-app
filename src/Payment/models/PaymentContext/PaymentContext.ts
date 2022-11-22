import type {PaymentStrategy} from 'src/@types/payments';
import type {PaymentAmount} from '../PaymentAmount/PaymentAmount';

export class PaymentContext {
  #strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.#strategy = strategy;
  }

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.#strategy = strategy;
  }

  pay(paymentAmount: PaymentAmount) {
    this.#strategy.pay(paymentAmount.totalAmount());
  }
}

// Implementation example
// const defineStrategy = new DebitPaymentStrategy(new Card('123456', '22/11', 234));
// const payment = new PaymentContext(defineStrategy);
// payment.pay(100, 20, 50);
