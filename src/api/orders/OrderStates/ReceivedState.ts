import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import ConfirmedState from './ConfirmedState';
import {ORDER_STATES} from './constants';
import RejectedState from './RejectedState';
class ReceivedState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.receivedState);
  }

  nextStep() {
    this.context.changeState(new ConfirmedState(this.context));
  }

  reject() {
    this.context.changeState(new RejectedState(this.context));
  }
}

export default ReceivedState;
