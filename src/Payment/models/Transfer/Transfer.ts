import type Account from '../Account/Account';
import type IPaymentStrategy from '../IPaymentStrategy';

class Transfer implements IPaymentStrategy {
  #account: Account;

  constructor(account: Account) {
    this.#account = account;
  }

  pay(amount: number) {
    try {
      this.#account.isValid();
      console.log(`Currently paying with a transfer: ${amount} €`);
    } catch (error) {
      return error;
    }
  }
}

export default Transfer;
