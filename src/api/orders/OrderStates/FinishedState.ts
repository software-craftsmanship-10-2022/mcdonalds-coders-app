import OrderState from './OrderState';

class FinishedState extends OrderState {
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
