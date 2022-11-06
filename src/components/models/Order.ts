const OVER_0_ERROR = "Order amount must be greater than 0";

class Order {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  checkAmountValue() {
    if (this.amount <= 0) throw new Error(OVER_0_ERROR);
  }
  totalAmount(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Order;
