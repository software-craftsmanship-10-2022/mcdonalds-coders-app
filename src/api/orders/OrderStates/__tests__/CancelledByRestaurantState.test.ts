import type Order from '../../Order';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import {mockNewOrder} from '../mocks/mocks';

describe('Given a CancelledByRestaurant class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new CancelledByRestaurantState(order));
  });

  it('when nextState method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });

  it('when cancelByUser method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when cancelByRestaurant method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when reject method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
});
