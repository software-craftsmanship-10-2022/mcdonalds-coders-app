import type Order from '../../Order';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import DeliveringState from '../DeliveringState';
import FinishedState from '../FinishedState';
import {mockNewOrder} from '../mocks/mocks';

describe('Given a DeliveringState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new DeliveringState(order));
  });

  it('when nextState method is called order.getState() should return FinishedState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(FinishedState);
  });

  it('when cancelByUser method is called order.getState() should return DeliveringState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(DeliveringState);
  });
  it('when cancelByRestaurant method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when reject method is called order.getState() should return DeliveringState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(DeliveringState);
  });
});