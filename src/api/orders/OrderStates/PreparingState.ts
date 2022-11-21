import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
<<<<<<< HEAD
import {ORDER_STATES} from './constants';
=======
import {MAPPED_ORDER_STATES} from './constants';
>>>>>>> aae9c3d (Squashed commit of the following:)
import OrderState from './OrderState';
import ReadyState from './ReadyState';
class PreparingState extends OrderState {
  constructor(order: Order) {
<<<<<<< HEAD
    super(order, ORDER_STATES.preparingState);
=======
    super(order, MAPPED_ORDER_STATES.preparingState.code);
>>>>>>> aae9c3d (Squashed commit of the following:)
  }

  nextStep() {
    this.order.changeState(new ReadyState(this.order));
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }
}

export default PreparingState;
