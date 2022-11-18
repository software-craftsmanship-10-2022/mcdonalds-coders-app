import OrderState from './OrderState';

class CancelledByUserState extends OrderState {
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

export default CancelledByUserState;
