import type Order from '../../Order';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import {mockNewOrder} from '../mocks/mocks';
import PreparingState from '../PreparingState';
import ReadyState from '../ReadyState';

describe('Given a PreparingState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new PreparingState(order));
  });

  it('when nextState method is called order.getState() should return ReadyState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(ReadyState);
  });

  it('when cancelByUser method is called order.getState() should return PreparingState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(PreparingState);
  });
  it('when cancelByRestaurant method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when reject method is called order.getState() should return PreparingState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(PreparingState);
  });
});
