import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import CancelledByUserState from './CancelledByUserState';
import {ORDER_STATES} from './constants';
import PreparingState from './PreparingState';

class ConfirmedState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.confirmedState);
  }

  nextStep() {
    this.context.changeState(new PreparingState(this.context));
  }

  cancelByUser() {
    this.context.changeState(new CancelledByUserState(this.context));
  }

  cancelByRestaurant() {
    this.context.changeState(new CancelledByRestaurantState(this.context));
  }
}

export default ConfirmedState;
