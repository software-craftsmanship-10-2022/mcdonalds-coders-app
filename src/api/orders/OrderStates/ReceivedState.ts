import type Order from '../Order';
import ConfirmedState from './ConfirmedState';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
import RejectedState from './RejectedState';
class ReceivedState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.receivedState.code);
  }

  nextStep() {
    this.order.changeState(new ConfirmedState(this.order));
  }

  reject() {
    this.order.changeState(new RejectedState(this.order));
  }
}

export default ReceivedState;
