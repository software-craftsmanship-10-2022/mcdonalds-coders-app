import type {IStateContext} from './IStateContext';
import type McState from './McState';

export class FakeStateContext implements IStateContext {
  changeState(state: McState): void {
    console.log('test');
  }
}
