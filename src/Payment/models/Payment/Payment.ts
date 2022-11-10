import type Donation from '../Donation/Donation';
import type Order from '../Order/Order';

const NO_ORDER_ERROR = 'Order is required';
const NO_DONATION_ERROR = 'Donation is required';

class Payment {
  constructor(
    protected paymentType: string,
    protected order: Order,
    protected donation: Donation,
  ) {}

  pay() {
    if (!this.order) throw new Error(NO_ORDER_ERROR);
    if (!this.donation) throw new Error(NO_DONATION_ERROR);
  }
}

export default Payment;
