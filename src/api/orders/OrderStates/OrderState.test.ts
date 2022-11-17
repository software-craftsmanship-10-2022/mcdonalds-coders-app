import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import OrderState from './OrderState';

describe('Given a OrderState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
  });

  it('when an instance is created then nextStep() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.nextStep).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.cancelByUser).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByRestaurant() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.cancelByRestaurant).toBeInstanceOf(Function);
  });

  it('when an instance is created then reject() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.reject).toBeInstanceOf(Function);
  });
});
