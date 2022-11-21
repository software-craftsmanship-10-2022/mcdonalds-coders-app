import {PaymentMethod} from 'src/@types/order';
import type {PaymentStrategy} from 'src/@types/payments';
import type Order from 'src/api/orders/Order';
import type Card from '../Card/Card';
import type Donation from '../Donation/Donation';
import Payment from '../Payment/Payment';

class Debit extends Payment {
  constructor(order: Order, donation: Donation, private readonly card: Card) {
    super(PaymentMethod.debit, order, donation);
  }

  pay() {
    super.pay();
    this.card.isValid();
    this.donation.amountValue();
  }
}

export default Debit;

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
