import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import {ORDER_STATES} from './constants';
import ReadyState from './ReadyState';
class PreparingState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.preparingState);
  }

  nextStep() {
    this.context.changeState(new ReadyState(this.context));
  }

  cancelByRestaurant() {
    this.context.changeState(new CancelledByRestaurantState(this.context));
  }
}

export default PreparingState;
