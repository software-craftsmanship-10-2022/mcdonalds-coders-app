import type {PaymentStrategy} from 'src/@types/payments';

export class PaymentContext {
  #strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.#strategy = strategy;
  }

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.#strategy = strategy;
  }

  pay(paymentAmount: number) {
    this.#strategy.pay(paymentAmount);
  }
}
