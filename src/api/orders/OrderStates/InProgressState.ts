import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import {ORDER_STATES} from './constants';
import ReceivedState from './ReceivedState';

class InProgressState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.inProgressState);
  }

  nextStep() {
    this.context.changeState(new ReceivedState(this.context));
  }
}

export default InProgressState;
