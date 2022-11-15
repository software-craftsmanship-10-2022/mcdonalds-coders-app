import {PaymentMethod} from 'src/@types/order';
import type Order from 'src/api/orders/Order';
import type Donation from '../Donation/Donation';
import Payment from '../Payment/Payment';

class Cash extends Payment {
  constructor(order: Order, donation: Donation) {
    super(PaymentMethod.cash, order, donation);
  }

  pay() {
    super.pay();
    // This.order.totalAmount();
    this.donation.amountValue();
  }
}

export default Cash;
