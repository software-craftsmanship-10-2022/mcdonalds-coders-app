import type Card from '../Card/Card';
import type IPaymentStrategy from '../IPaymentStrategy';

class Debit implements IPaymentStrategy {
  #card: Card;

  constructor(card: Card) {
    this.#card = card;
  }

  pay(amount: number) {
    try {
      this.#card.isValid();
      console.log(`Currently paying with a credit card: ${amount} €`);
    } catch (error) {
      return error;
    }
  }
}

export default Debit;
