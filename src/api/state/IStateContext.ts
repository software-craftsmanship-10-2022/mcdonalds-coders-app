import type McState from './McState';

export interface IStateContext {
  changeState(state: McState): void;
}
