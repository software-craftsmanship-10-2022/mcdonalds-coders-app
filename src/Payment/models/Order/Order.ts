import {ORDER_ERRORS} from '../../errorMessages';

class Order {
  constructor(public amount: number) {}

  checkAmountValue() {
    if (this.amount <= 0) throw new Error(ORDER_ERRORS.over0Number);
  }

  totalAmount(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Order;
