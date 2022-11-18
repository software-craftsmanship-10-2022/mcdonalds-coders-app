import type Order from '../Order';
import OrderState from './OrderState';
class CancelledByUserState extends OrderState {
  constructor(order: Order) {
    super(order, 'Pedido cancelado');
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

export default CancelledByUserState;
