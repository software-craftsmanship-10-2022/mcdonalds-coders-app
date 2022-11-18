import type Order from '../Order';
import OrderState from './OrderState';
class RejectedState extends OrderState {
  constructor(order: Order) {
    super(order, 'Pedido rechazado');
  }

  nextStep() {
    // Do nothing
  }

  cancelByUser() {
    // Do nothing
  }

  cancelByRestaurant() {
    // Do nothing
  }

  reject() {
    // Do nothing
  }
}

export default RejectedState;
