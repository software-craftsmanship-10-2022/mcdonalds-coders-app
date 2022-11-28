import type {IStateContext} from 'src/api/state/IStateContext';
import McState from 'src/api/state/McState';
import {ORDER_STATES} from './constants';
class RejectedState extends McState {
  constructor(context: IStateContext) {
    super(context, ORDER_STATES.rejectedState);
  }
}

export default RejectedState;
