import OrderState from './OrderState';

class ConfirmedState extends OrderState {
  nextStep() {
    // Do something
    // this.order.changeState(nextState);
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

export default ConfirmedState;
