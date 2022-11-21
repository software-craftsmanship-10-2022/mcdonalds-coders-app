import type Order from '../Order';

class OrderState {
  constructor(protected order: Order, private readonly code: string) {}

  nextStep() {
    // Do something
  }

  cancelByUser() {
    // Do something
  }

  cancelByRestaurant() {
    // Do something
  }

  reject() {
    // Do something
  }

  getCode(): string {
    return this.code;
  }
}

export default OrderState;
