import type Order from '../Order';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
class CancelledByUserState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.cancelledByUserState.code);
  }

  nextStep() {
    // Do nothing
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

export default CancelledByUserState;
