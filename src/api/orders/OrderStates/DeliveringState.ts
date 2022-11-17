import CancelledByRestaurantState from './CancelledByRestaurantState';
import OrderState from './OrderState';

class DeliveringState extends OrderState {
  nextStep() {
    // This.order.changeState(new ConfirmedState(this.order));
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
