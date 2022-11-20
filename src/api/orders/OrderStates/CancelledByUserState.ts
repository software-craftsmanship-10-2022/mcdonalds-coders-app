import type Order from '../Order';
import {ORDER_STATES} from './constants';
import OrderState from './OrderState';
class CancelledByUserState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.cancelledByUserState);
  }
}

export default CancelledByUserState;
