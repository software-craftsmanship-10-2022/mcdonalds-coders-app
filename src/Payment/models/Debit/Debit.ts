import type {PaymentStrategy} from 'src/@types/payments';
import type Card from '../Card/Card';

export class DebitPaymentStrategy implements PaymentStrategy {
  #card: Card;

  constructor(card: Card) {
    this.#card = card;
  }

  pay(amount: number) {
    this.#card.isValid();

    console.log(`Currently paying with a credit card: ${amount} €`);
  }
}
