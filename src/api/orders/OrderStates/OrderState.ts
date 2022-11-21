import type Order from '../Order';
<<<<<<< HEAD
import type {OrderStateType} from './constants';

class OrderState {
  constructor(protected order: Order, private readonly state: OrderStateType) {}
=======

class OrderState {
  constructor(protected order: Order, private readonly code: string) {}
>>>>>>> aae9c3d (Squashed commit of the following:)

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
<<<<<<< HEAD
    return this.state.code;
  }

  getDescription(): string {
    return this.state.description;
=======
    return this.code;
>>>>>>> aae9c3d (Squashed commit of the following:)
  }
}

export default OrderState;
