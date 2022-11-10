import {PAYMENT_TYPE} from 'src/config';
import type Donation from '../Donation/Donation';
import type Order from '../Order/Order';
import Payment from '../Payment/Payment';

class Cash extends Payment {
  constructor(order: Order, donation: Donation) {
    super(PAYMENT_TYPE.cash, order, donation);
  }

  pay() {
    super.pay();

    this.order.totalAmount();
    this.donation.amountValue();
  }
}

export default Cash;
