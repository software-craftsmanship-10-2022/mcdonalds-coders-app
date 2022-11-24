import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import {ORDER_STATES} from './constants';
import FinishedState from './FinishedState';
class DeliveringState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.deliveringState);
  }

  nextStep() {
    this.context.changeState(new FinishedState(this.context));
  }

  cancelByRestaurant() {
    this.context.changeState(new CancelledByRestaurantState(this.context));
  }
}

export default DeliveringState;
