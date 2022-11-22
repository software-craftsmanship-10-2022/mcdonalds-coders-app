import type Order from '../Order';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
class FinishedState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.finishedState.code);
  }
}

export default FinishedState;
