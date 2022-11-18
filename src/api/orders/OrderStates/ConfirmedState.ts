import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import CancelledByUserState from './CancelledByUserState';
import OrderState from './OrderState';
import PreparingState from './PreparingState';

class ConfirmedState extends OrderState {
  constructor(order: Order) {
    super(order, 'Pedido confirmado');
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

  reject() {
    // Do nothing
  }
}

export default ConfirmedState;
