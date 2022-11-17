import ConfirmedState from './ConfirmedState';
import OrderState from './OrderState';
import RejectedState from './RejectedState';

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
    this.order.changeState(new RejectedState(this.order));
  }
}

export default ReceivedState;
