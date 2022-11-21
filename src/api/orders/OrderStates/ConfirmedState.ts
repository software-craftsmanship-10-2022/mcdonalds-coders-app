import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import CancelledByUserState from './CancelledByUserState';
<<<<<<< HEAD
import {ORDER_STATES} from './constants';
=======
import {MAPPED_ORDER_STATES} from './constants';
>>>>>>> aae9c3d (Squashed commit of the following:)
import OrderState from './OrderState';
import PreparingState from './PreparingState';

class ConfirmedState extends OrderState {
  constructor(order: Order) {
<<<<<<< HEAD
    super(order, ORDER_STATES.confirmedState);
=======
    super(order, MAPPED_ORDER_STATES.confirmedState.code);
>>>>>>> aae9c3d (Squashed commit of the following:)
  }

  nextStep() {
    this.order.changeState(new PreparingState(this.order));
  }

  cancelByUser() {
    this.order.changeState(new CancelledByUserState(this.order));
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }
}

export default ConfirmedState;
