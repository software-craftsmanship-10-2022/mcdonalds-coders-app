import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import OrderState from './OrderState';

describe('Given a OrderState class', () => {
  let order: Order;

  const STATE_DESCRIPTION = 'Test state';
  beforeEach(() => {
    order = mockNewOrder();
  });

  it('when an instance is created then nextStep() method should be defined', () => {
    const orderState = new OrderState(order, STATE_DESCRIPTION);
    expect(orderState.nextStep).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    const orderState = new OrderState(order, STATE_DESCRIPTION);
    expect(orderState.cancelByUser).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByRestaurant() method should be defined', () => {
    const orderState = new OrderState(order, STATE_DESCRIPTION);
    expect(orderState.cancelByRestaurant).toBeInstanceOf(Function);
  });

  it('when an instance is created then reject() method should be defined', () => {
    const orderState = new OrderState(order, STATE_DESCRIPTION);
    expect(orderState.reject).toBeInstanceOf(Function);
  });

  it('when an instance is created then getDescription() method should be constructor description', () => {
    const orderState = new OrderState(order, STATE_DESCRIPTION);
    expect(orderState.getDescription()).toBe(STATE_DESCRIPTION);
  });
});
