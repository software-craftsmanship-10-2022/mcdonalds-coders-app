<<<<<<< HEAD
import {mockNewOrder} from '../../mocks/mocks';
import type Order from '../../Order';
import CancelledByUserState from '../CancelledByUserState';
=======
import type Order from '../../Order';
import CancelledByUserState from '../CancelledByUserState';
import {mockNewOrder} from '../mocks/mocks';
>>>>>>> aae9c3d (Squashed commit of the following:)

describe('Given a CancelledByUser class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new CancelledByUserState(order));
  });

  it('when nextState method is called order.getState() should return CancelledByUserState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(CancelledByUserState);
  });

  it('when cancelByUser method is called order.getState() should return CancelledByUserState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(CancelledByUserState);
  });
  it('when cancelByRestaurant method is called order.getState() should return CancelledByUserState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByUserState);
  });
  it('when reject method is called order.getState() should return CancelledByUserState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(CancelledByUserState);
  });
});
