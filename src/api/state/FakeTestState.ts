import {FAKE_STATE, TEST_STATES} from './constants';
import type {IStateContext} from './IStateContext';
import McState from './McState';

class FakeTestState extends McState {
  constructor(context: IStateContext) {
    super(context, TEST_STATES[FAKE_STATE]);
  }
}

export default FakeTestState;
