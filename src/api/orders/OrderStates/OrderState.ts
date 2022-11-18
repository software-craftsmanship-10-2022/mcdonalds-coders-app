import type Order from '../Order';

class OrderState {
  constructor(protected order: Order, private readonly description: string) {}

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

  getDescription(): string {
    return this.description;
  }
}

export default OrderState;
