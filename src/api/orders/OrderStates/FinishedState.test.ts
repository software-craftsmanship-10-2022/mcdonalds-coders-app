import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import FinishedState from './FinishedState';

describe('Given a FinishedState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new FinishedState(order));
  });

  it('when nextState method is called order.getState() should return FinishedState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(FinishedState);
  });

  it('when cancelByUser method is called order.getState() should return FinishedState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(FinishedState);
  });
  it('when cancelByRestaurant method is called order.getState() should return FinishedState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(FinishedState);
  });
  it('when reject method is called order.getState() should return FinishedState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(FinishedState);
  });
});
