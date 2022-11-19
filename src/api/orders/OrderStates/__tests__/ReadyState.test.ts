import type Order from '../../Order';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import DeliveringState from '../DeliveringState';
import {mockNewOrder} from '../mocks/mocks';
import ReadyState from '../ReadyState';

describe('Given a ReadyState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new ReadyState(order));
  });

  it('when nextState method is called order.getState() should return DeliveringState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(DeliveringState);
  });

  it('when cancelByUser method is called order.getState() should return ReadyState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(ReadyState);
  });
  it('when cancelByRestaurant method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when reject method is called order.getState() should return ReadyState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(ReadyState);
  });
});
