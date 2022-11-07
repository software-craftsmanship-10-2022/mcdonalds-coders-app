import Card from "../Card/Card";
import Donation from "../Donation/Donation";
import Order from "../Order/Order";
import Payment from "../Payment/Payment";

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
