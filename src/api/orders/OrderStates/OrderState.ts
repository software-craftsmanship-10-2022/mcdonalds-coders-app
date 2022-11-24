import type Order from '../Order';
import type {OrderStateType} from './constants';

class OrderState {
  constructor(
    protected order: Order,
    private readonly state: OrderStateType,
    private readonly createdAt: number = Date.now(),
  ) {
    createdAt = Date.now();
  }

  nextStep() {
    // Do something
  }

  cancelByUser() {
    // Do something
  }

  cancelByRestaurant() {
    // Do something
  }

  reject() {
    // Do something
  }

  getCode(): string {
    return this.state.code;
  }

  getDescription(): string {
    return this.state.description;
  }

  getCreatedAt(): number {
    return this.createdAt;
  }
}

export default OrderState;
