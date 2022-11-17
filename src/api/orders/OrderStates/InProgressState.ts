import OrderState from './OrderState';
import ReceivedState from './ReceivedState';

class InProgressState extends OrderState {
  nextStep() {
    this.order.changeState(new ReceivedState(this.order));
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

export default InProgressState;
