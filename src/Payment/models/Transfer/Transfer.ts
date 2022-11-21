import type {PaymentStrategy} from 'src/@types/payments';
import type Account from '../Account/Account';

export class TransferPaymentStrategy implements PaymentStrategy {
  #account: Account;

  constructor(account: Account) {
    this.#account = account;
  }

  pay(amount: number) {
    this.#account.isValid();

    console.log(`Currently paying with a tranfer: ${amount} €`);
  }
}
