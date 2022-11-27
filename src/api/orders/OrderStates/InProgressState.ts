import type Order from '../Order';
import {ORDER_STATES} from './constants';
import OrderState from './OrderState';
import ReceivedState from './ReceivedState';

class InProgressState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.inProgressState);
  }

  nextStep() {
    this.order.changeState(new ReceivedState(this.order));
  }
}

export default InProgressState;
