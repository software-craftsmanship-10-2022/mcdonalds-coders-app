<<<<<<< HEAD
import {mockNewOrder} from '../../mocks/mocks';
import type Order from '../../Order';
import ConfirmedState from '../ConfirmedState';
=======
import type Order from '../../Order';
import ConfirmedState from '../ConfirmedState';
import {mockNewOrder} from '../mocks/mocks';
>>>>>>> aae9c3d (Squashed commit of the following:)
import ReceivedState from '../ReceivedState';
import RejectedState from '../RejectedState';

describe('Given a ReceivedState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new ReceivedState(order));
  });

  it('when an nextState is called order.getState() should return ConfirmedState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(ConfirmedState);
  });

  it('when an cancelByUser is called order.getState() should return ReceivedState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(ReceivedState);
  });
  it('when an cancelByRestaurant is called order.getState() should return ReceivedState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(ReceivedState);
  });
  it('when an reject is called order.getState() should return RejectedState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });
});
