import type Order from '../Order';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
import ReceivedState from './ReceivedState';

class InProgressState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.inProgressState.code);
  }

  nextStep() {
    this.order.changeState(new ReceivedState(this.order));
  }

  cancelByUser() {
    // Do nothing
  }

  cancelByRestaurant() {
    // Do nothing
  }

  reject() {
    // Do nothing
  }
}

export default InProgressState;
