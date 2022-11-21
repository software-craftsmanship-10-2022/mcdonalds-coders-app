import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
<<<<<<< HEAD
import {ORDER_STATES} from './constants';
=======
import {MAPPED_ORDER_STATES} from './constants';
>>>>>>> aae9c3d (Squashed commit of the following:)
import FinishedState from './FinishedState';
import OrderState from './OrderState';
class DeliveringState extends OrderState {
  constructor(order: Order) {
<<<<<<< HEAD
    super(order, ORDER_STATES.deliveringState);
=======
    super(order, MAPPED_ORDER_STATES.deliveringState.code);
>>>>>>> aae9c3d (Squashed commit of the following:)
  }

  nextStep() {
    this.order.changeState(new FinishedState(this.order));
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }
}

export default DeliveringState;
