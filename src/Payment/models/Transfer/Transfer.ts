import {PAYMENT_TYPE} from 'src/config';
import type Account from '../Account/Account';
import type Donation from '../Donation/Donation';
import type Order from '../Order/Order';
import Payment from '../Payment/Payment';

class Transfer extends Payment {
  constructor(order: Order, donation: Donation, private readonly account: Account) {
    super(PAYMENT_TYPE.transfer, order, donation);
  }

  pay() {
    super.pay();
    this.account.isValid();

    this.order.totalAmount();
    this.donation.amountValue();
  }
}

export default Transfer;
