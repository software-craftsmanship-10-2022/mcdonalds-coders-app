import Donation from "./Donation";
import Order from "./Order";

const NO_ORDER_ERROR = "Order is required";
const NO_DONATION_ERROR = "Donation is required";

class Payment {
  order: Order;
  donation: Donation;

  constructor(order: Order, donation: Donation) {
    this.order = order;
    this.donation = donation;
  }

  pay() {
    if (!this.order) throw new Error(NO_ORDER_ERROR);
    if (!this.donation) throw new Error(NO_DONATION_ERROR);
  }
}

export default Payment;
