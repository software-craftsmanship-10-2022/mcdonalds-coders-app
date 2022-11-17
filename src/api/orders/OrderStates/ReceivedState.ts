import ConfirmedState from './ConfirmedState';
import OrderState from './OrderState';

class ReceivedState extends OrderState {
  nextStep() {
    this.order.changeState(new ConfirmedState(this.order));
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

export default ReceivedState;
