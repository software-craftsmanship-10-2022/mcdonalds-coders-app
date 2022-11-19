import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import {MAPPED_ORDER_STATES} from './constants';
import FinishedState from './FinishedState';
import OrderState from './OrderState';
class DeliveringState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.deliveringState.code);
  }

  nextStep() {
    this.order.changeState(new FinishedState(this.order));
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

export default DeliveringState;
