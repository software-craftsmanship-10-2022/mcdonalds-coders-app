import type Order from '../../Order';
import {ORDER_STATES} from '../constants';
import {mockNewOrder} from '../mocks/mocks';
import OrderState from '../OrderState';

describe('Given a OrderState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
  });
  const IN_PROGRESS_CODE = 'inProgressState';

  it('when an instance is created then nextStep() method should be defined', () => {
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
    expect(orderState.nextStep).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
    expect(orderState.cancelByUser).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByRestaurant() method should be defined', () => {
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
    expect(orderState.cancelByRestaurant).toBeInstanceOf(Function);
  });

  it('when an instance is created then reject() method should be defined', () => {
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
    expect(orderState.reject).toBeInstanceOf(Function);
  });

  it('when an instance is created then getDescription() method should be constructor description', () => {
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
    expect(orderState.getCode()).toBe(IN_PROGRESS_CODE);
  });
});
