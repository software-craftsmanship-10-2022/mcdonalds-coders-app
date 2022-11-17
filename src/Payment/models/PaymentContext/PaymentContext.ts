import type IPaymentStrategy from '../IPaymentStrategy';

class PaymentContext {
  constructor(protected paymentStrategy: IPaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy: IPaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  pay() {
    this.paymentStrategy.pay(32);
  }
}

export default PaymentContext;
