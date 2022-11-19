import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import {MAPPED_ORDER_STATES} from './constants';
import DeliveringState from './DeliveringState';
import OrderState from './OrderState';
class ReadyState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.readyState.code);
  }

  nextStep() {
    this.order.changeState(new DeliveringState(this.order));
  }

  cancelByUser() {
    // Do nothing
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }

  reject() {
    // Do nothing
  }
}

export default ReadyState;
