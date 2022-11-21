import Order from 'src/api/orders/Order';
import {DONATION_ERRORS, ORDER_ERRORS} from 'src/Payment/errorMessages';
import Donation from '../Donation/Donation';

class Payment {
  constructor(protected order: Order, protected donation: Donation) {}

  checkOrder() {
    if (!this.order) throw new Error(ORDER_ERRORS.noOrderError);
    if (!(this.order instanceof Order)) throw new Error(ORDER_ERRORS.typeError);
  }

  checkDonation() {
    if (!this.donation) throw new Error(DONATION_ERRORS.noDonationError);
    if (!(this.donation instanceof Donation)) throw new Error(DONATION_ERRORS.typeError);
  }

  pay() {
    this.checkOrder();
    this.checkDonation();
  }
}

export default Payment;
