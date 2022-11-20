import {PaymentMethod} from 'src/@types/order';
import Order from 'src/api/orders/Order';
import {STORAGE} from 'src/config';
import {DONATION_ERRORS, ORDER_ERRORS, PAYMENT_TYPE_ERRORS} from 'src/Payment/errorMessages';
import Donation from '../Donation/Donation';

class Payment {
  constructor(
    protected paymentType: PaymentMethod,
    protected order: Order,
    protected donation: Donation,
  ) {}

  checkPaymentType() {
    if (this.paymentType === undefined) throw new Error(PAYMENT_TYPE_ERRORS.noPaymentType);
    if (typeof this.paymentType !== 'number') throw new Error(PAYMENT_TYPE_ERRORS.typeValue);
    if (
      this.paymentType !== PaymentMethod.cash &&
      this.paymentType !== PaymentMethod.debit &&
      this.paymentType !== PaymentMethod.transfer
    )
      throw new Error(PAYMENT_TYPE_ERRORS.typeValue);
  }

  checkOrder() {
    if (!this.order) throw new Error(ORDER_ERRORS.noOrderError);
    if (!(this.order instanceof Order)) throw new Error(ORDER_ERRORS.typeError);
  }

  getPaymentType() {
    return this.paymentType;
  }

  checkDonation() {
    if (!this.donation) throw new Error(DONATION_ERRORS.noDonationError);
    if (!(this.donation instanceof Donation)) throw new Error(DONATION_ERRORS.typeError);
  }

  pay() {
    this.checkPaymentType();
    this.checkOrder();
    this.checkDonation();
    this.order.nextStep();
    localStorage.setItem(
      STORAGE.orders,
      JSON.stringify({
        ...this.order,
        total: this.order.getTotalPrice() + this.donation.amountValue(),
        paymentType: this.paymentType,
      }),
    );
  }
}

export default Payment;
