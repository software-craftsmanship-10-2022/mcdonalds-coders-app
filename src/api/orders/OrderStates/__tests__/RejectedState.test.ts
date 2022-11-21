<<<<<<< HEAD
import {mockNewOrder} from '../../mocks/mocks';
import type Order from '../../Order';
=======
import type Order from '../../Order';
import {mockNewOrder} from '../mocks/mocks';
>>>>>>> aae9c3d (Squashed commit of the following:)
import RejectedState from '../RejectedState';

describe('Given a RejectedState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new RejectedState(order));
  });

  it('when nextState method is called order.getState() should return RejectedState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });

  it('when cancelByUser method is called order.getState() should return RejectedState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });
  it('when cancelByRestaurant method is called order.getState() should return RejectedState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });
  it('when reject method is called order.getState() should return RejectedState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });
});
