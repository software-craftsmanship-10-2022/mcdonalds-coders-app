import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import DeliveringState from './DeliveringState';
import OrderState from './OrderState';
class ReadyState extends OrderState {
  constructor(order: Order) {
    super(order, 'Pedido preparado');
  }

  nextStep() {
    this.order.changeState(new DeliveringState(this.order));
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

export default ReadyState;
