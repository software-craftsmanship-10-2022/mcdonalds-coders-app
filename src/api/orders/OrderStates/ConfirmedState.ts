import CancelledByUserState from './CancelledByUserState';
import OrderState from './OrderState';

class ConfirmedState extends OrderState {
  nextStep() {
    // Do something
    // this.order.changeState(nextState);
  }

  cancelByUser() {
    this.order.changeState(new CancelledByUserState(this.order));
  }

  cancelByRestaurant() {
    // Do nothing
  }

  reject() {
    // Do nothing
  }
}

export default ConfirmedState;
