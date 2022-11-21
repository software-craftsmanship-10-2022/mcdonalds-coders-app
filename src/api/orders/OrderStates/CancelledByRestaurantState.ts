import type Order from '../Order';
import {ORDER_STATES} from './constants';
import OrderState from './OrderState';
class CancelledByRestaurantState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.cancelledByRestaurantState);
  }
}

export default CancelledByRestaurantState;
