import type Order from '../Order';
import ConfirmedState from './ConfirmedState';
<<<<<<< HEAD
import {ORDER_STATES} from './constants';
=======
import {MAPPED_ORDER_STATES} from './constants';
>>>>>>> aae9c3d (Squashed commit of the following:)
import OrderState from './OrderState';
import RejectedState from './RejectedState';
class ReceivedState extends OrderState {
  constructor(order: Order) {
<<<<<<< HEAD
    super(order, ORDER_STATES.receivedState);
=======
    super(order, MAPPED_ORDER_STATES.receivedState.code);
>>>>>>> aae9c3d (Squashed commit of the following:)
  }

  nextStep() {
    this.order.changeState(new ConfirmedState(this.order));
  }

  reject() {
    this.order.changeState(new RejectedState(this.order));
  }
}

export default ReceivedState;
