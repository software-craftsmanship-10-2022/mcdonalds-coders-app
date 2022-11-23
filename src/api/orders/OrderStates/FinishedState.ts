import type Order from '../Order';
import {ORDER_STATES} from './constants';
import OrderState from './OrderState';
class FinishedState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.finishedState);
  }
}

export default FinishedState;
