import type Order from '../Order';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
class CancelledByRestaurantState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.cancelledByRestaurantState.code);
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

export default CancelledByRestaurantState;
