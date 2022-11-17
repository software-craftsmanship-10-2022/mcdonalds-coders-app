import type Order from '../Order';

class OrderState {
  constructor(protected order: Order) {}

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
}

export default OrderState;
