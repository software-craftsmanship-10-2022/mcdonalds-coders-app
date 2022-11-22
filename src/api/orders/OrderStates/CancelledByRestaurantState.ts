import type Order from '../Order';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
class CancelledByRestaurantState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.cancelledByRestaurantState.code);
  }
}

export default CancelledByRestaurantState;
