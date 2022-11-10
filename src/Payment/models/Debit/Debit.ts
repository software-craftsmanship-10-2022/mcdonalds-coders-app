import {PAYMENT_TYPE} from 'src/config';
import type Card from '../Card/Card';
import type Donation from '../Donation/Donation';
import type Order from '../Order/Order';
import Payment from '../Payment/Payment';

class Debit extends Payment {
  constructor(order: Order, donation: Donation, private readonly card: Card) {
    super(PAYMENT_TYPE.debit, order, donation);
  }

  pay() {
    super.pay();
    this.card.isValid();
    this.order.totalAmount();
    this.donation.amountValue();
  }
}

export default Debit;
