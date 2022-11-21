import type Order from '../Order';
<<<<<<< HEAD
import {ORDER_STATES} from './constants';
=======
import {MAPPED_ORDER_STATES} from './constants';
>>>>>>> aae9c3d (Squashed commit of the following:)
import OrderState from './OrderState';
import ReceivedState from './ReceivedState';

class InProgressState extends OrderState {
  constructor(order: Order) {
<<<<<<< HEAD
    super(order, ORDER_STATES.inProgressState);
=======
    super(order, MAPPED_ORDER_STATES.inProgressState.code);
>>>>>>> aae9c3d (Squashed commit of the following:)
  }

  nextStep() {
    this.order.changeState(new ReceivedState(this.order));
  }
}

export default InProgressState;
