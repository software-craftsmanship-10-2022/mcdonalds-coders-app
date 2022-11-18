import CancelledByRestaurantState from './CancelledByRestaurantState';
import OrderState from './OrderState';
import ReadyState from './ReadyState';

class PreparingState extends OrderState {
  nextStep() {
    this.order.changeState(new ReadyState(this.order));
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

export default PreparingState;