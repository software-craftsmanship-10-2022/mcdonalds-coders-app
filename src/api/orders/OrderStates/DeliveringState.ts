import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import FinishedState from './FinishedState';
import OrderState from './OrderState';
class DeliveringState extends OrderState {
  constructor(order: Order) {
    super(order, 'Pedido en reparto');
  }

  nextStep() {
    this.order.changeState(new FinishedState(this.order));
  }

  cancelByUser() {
    // Do nothing
  }

  cancelByRestaurant() {
    this.order.changeState(new CancelledByRestaurantState(this.order));
  }

  reject() {
    // Do nothing
  }
}

export default DeliveringState;
