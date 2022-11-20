import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import {ORDER_STATES} from './constants';
import DeliveringState from './DeliveringState';
import OrderState from './OrderState';
class ReadyState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.readyState);
  }

  nextStep() {
    this.order.changeState(new DeliveringState(this.order));
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }
}

export default ReadyState;
