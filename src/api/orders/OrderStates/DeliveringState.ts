import CancelledByRestaurantState from './CancelledByRestaurantState';
import FinishedState from './FinishedState';
import OrderState from './OrderState';

class DeliveringState extends OrderState {
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
