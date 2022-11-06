import Card from "./Card";
import Donation from "./Donation";
import Order from "./Order";
import Payment from "./Payment";

class Debit extends Payment {
  card: Card;

  constructor(order: Order, donation: Donation, card: Card) {
    super(order, donation);
    this.card = card;
  }

  pay() {
    super.pay();
    this.card.isValid();

    // TODO pay cash
    this.order.totalAmount();
    this.donation.amountValue();
  }
}

export default Debit;
