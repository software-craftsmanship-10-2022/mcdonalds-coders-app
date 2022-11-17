import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import ConfirmedState from './ConfirmedState';

describe('Given a ConfirmedState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new ConfirmedState(order));
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().nextStep).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().cancelByUser).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().cancelByRestaurant).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().reject).toBeDefined();
  });
});
