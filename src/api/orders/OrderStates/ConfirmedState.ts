import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import CancelledByUserState from './CancelledByUserState';
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
import PreparingState from './PreparingState';

class ConfirmedState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.confirmedState.code);
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
