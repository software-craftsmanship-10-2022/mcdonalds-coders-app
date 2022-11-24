import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import {ORDER_STATES} from './constants';
class CancelledByRestaurantState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.cancelledByRestaurantState);
  }
}

export default CancelledByRestaurantState;
