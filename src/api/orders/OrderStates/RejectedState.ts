import type Order from '../Order';
import {ORDER_STATES} from './constants';
import OrderState from './OrderState';
class RejectedState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.rejectedState);
  }
}

export default RejectedState;
