import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import {ORDER_STATES} from './constants';
import DeliveringState from './DeliveringState';
class ReadyState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.readyState);
  }

  nextStep() {
    this.context.changeState(new DeliveringState(this.context));
  }

  cancelByRestaurant() {
    this.context.changeState(new CancelledByRestaurantState(this.context));
  }
}

export default ReadyState;
