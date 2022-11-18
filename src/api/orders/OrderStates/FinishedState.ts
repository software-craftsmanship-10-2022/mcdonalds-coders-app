import type Order from '../Order';
import OrderState from './OrderState';
class FinishedState extends OrderState {
  constructor(order: Order) {
    super(order, 'Pedido finalizado');
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

export default FinishedState;
