import type {PaymentStrategy} from 'src/@types/payments';
import type {PaypalUser} from './PaypalUser';

export class PaypalPaymentStrategy implements PaymentStrategy {
  #user: PaypalUser;

  constructor(user: PaypalUser) {
    this.#user = user;
  }

  pay(amount: number) {
    this.#user.isValid();

    console.log(`Currently paying with a paypal account: ${amount} €`);
  }
}
