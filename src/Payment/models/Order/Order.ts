import {ORDER_ERRORS} from '../../errorMessages';

class Order {
  constructor(public amount: number) {}

  checkAmountValue() {
    if (this.amount === undefined || this.amount === null)
      throw new Error(ORDER_ERRORS.noOrderAmount);
    if (typeof this.amount !== 'number') throw new Error(ORDER_ERRORS.amountAsNumber);
    if (this.amount <= 0) throw new Error(ORDER_ERRORS.over0Number);
  }

  totalAmount(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Order;
