import {PaymentMethod} from 'src/@types/order';
import type Order from 'src/api/orders/Order';
import type Account from '../Account/Account';
import type Donation from '../Donation/Donation';
import Payment from '../Payment/Payment';

class Transfer extends Payment {
  constructor(order: Order, donation: Donation, private readonly account: Account) {
    super(PaymentMethod.transfer, order, donation);
  }

  pay() {
    super.pay();
    this.account.isValid();
    this.donation.amountValue();
  }
}

export default Transfer;
