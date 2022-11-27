import type {PaymentStrategy} from 'src/@types/payments';

export class CashPaymentStrategy implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Currently paying with cash: ${amount} €`);
  }
}
