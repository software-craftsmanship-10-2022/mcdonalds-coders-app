import {PAYMENT_TYPE} from 'src/config';
import {DONATION_ERRORS, ORDER_ERRORS, PAYMENT_TYPE_ERRORS} from 'src/Payment/errorMessages';
import Donation from '../Donation/Donation';
import Order from '../Order/Order';

class Payment {
  constructor(
    protected paymentType: string,
    protected order: Order,
    protected donation: Donation,
  ) {}

  checkPaymentType() {
    if (!this.paymentType) throw new Error(PAYMENT_TYPE_ERRORS.noPaymentType);
    if (typeof this.paymentType !== 'string') throw new Error(PAYMENT_TYPE_ERRORS.typeValue);
    if (
      this.paymentType !== PAYMENT_TYPE.debit &&
      this.paymentType !== PAYMENT_TYPE.cash &&
      this.paymentType !== PAYMENT_TYPE.transfer
    )
      throw new Error(PAYMENT_TYPE_ERRORS.typeValue);
  }

  checkOrder() {
    if (!this.order) throw new Error(ORDER_ERRORS.noOrderError);
    if (!(this.order instanceof Order)) throw new Error(ORDER_ERRORS.typeError);
  }

  checkDonation() {
    if (!this.donation) throw new Error(DONATION_ERRORS.noDonationError);
    if (!(this.donation instanceof Donation)) throw new Error(DONATION_ERRORS.typeError);
  }

  pay() {
    this.checkPaymentType();
    this.checkOrder();
    this.checkDonation();
  }
}

export default Payment;
