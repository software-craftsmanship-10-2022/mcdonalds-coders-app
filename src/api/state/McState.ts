import type {OrderStateType} from '../orders/OrderStates/constants';
import {METHOD_NOT_IMPLEMENTED_ERROR} from './constants';
import type {IStateContext} from './IStateContext';

abstract class McState {
  constructor(protected context: IStateContext, private readonly state: OrderStateType) {}

  getCode(): string {
    return this.state.code;
  }

  getDescription(): string {
    return this.state.description;
  }

  nextStep(): void {
    throw new Error(METHOD_NOT_IMPLEMENTED_ERROR);
  }

  cancelByUser(): void {
    throw new Error(METHOD_NOT_IMPLEMENTED_ERROR);
  }

  cancelByRestaurant(): void {
    throw new Error(METHOD_NOT_IMPLEMENTED_ERROR);
  }

  reject(): void {
    throw new Error(METHOD_NOT_IMPLEMENTED_ERROR);
  }
}

export default McState;
