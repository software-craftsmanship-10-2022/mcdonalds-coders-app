import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import {ORDER_STATES} from './constants';
import OrderState from './OrderState';
import ReadyState from './ReadyState';
class PreparingState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.preparingState);
  }

  nextStep() {
    this.order.changeState(new ReadyState(this.order));
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }
}

export default PreparingState;
