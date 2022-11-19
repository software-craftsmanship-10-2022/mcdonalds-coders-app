import type Order from '../Order';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
class RejectedState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.rejectedState.code);
  }
}

export default RejectedState;
