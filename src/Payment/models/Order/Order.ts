import {ORDER_ERRORS} from '../../errorMessages';

type Item = {
  img: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
};

type Details = {
  address: string;
  img: string;
  isDelivery: boolean;
  name: string;
};

class Order {
  public confirmed = false;

  constructor(
    public amount: number,
    private readonly items: Item[],
    private readonly details: Details,
  ) {}

  checkAmountValue() {
    if (this.amount === undefined || this.amount === null)
      throw new Error(ORDER_ERRORS.noOrderAmount);
    if (typeof this.amount !== 'number') throw new Error(ORDER_ERRORS.amountAsNumber);
    if (this.amount <= 0) throw new Error(ORDER_ERRORS.over0Number);
  }

  confirm() {
    this.confirmed = true;
  }

  totalAmount(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Order;
