import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
<<<<<<< HEAD
import {ORDER_STATES} from './constants';
=======
import {MAPPED_ORDER_STATES} from './constants';
>>>>>>> aae9c3d (Squashed commit of the following:)
import DeliveringState from './DeliveringState';
import OrderState from './OrderState';
class ReadyState extends OrderState {
  constructor(order: Order) {
<<<<<<< HEAD
    super(order, ORDER_STATES.readyState);
=======
    super(order, MAPPED_ORDER_STATES.readyState.code);
>>>>>>> aae9c3d (Squashed commit of the following:)
  }

  nextStep() {
    this.order.changeState(new DeliveringState(this.order));
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }
}

export default ReadyState;
