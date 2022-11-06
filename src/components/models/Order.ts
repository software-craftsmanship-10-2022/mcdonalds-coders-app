import { ORDER_ERRORS } from "../../errorMessages";

class Order {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  checkAmountValue() {
    if (this.amount <= 0) throw new Error(ORDER_ERRORS.OVER_0_NUMBER);
  }
  totalAmount(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Order;
