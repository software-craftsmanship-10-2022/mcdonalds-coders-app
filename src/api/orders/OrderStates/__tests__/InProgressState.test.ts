<<<<<<< HEAD
import {mockNewOrder} from '../../mocks/mocks';
import type Order from '../../Order';
import InProgressState from '../InProgressState';
=======
import type Order from '../../Order';
import InProgressState from '../InProgressState';
import {mockNewOrder} from '../mocks/mocks';
>>>>>>> aae9c3d (Squashed commit of the following:)
import ReceivedState from '../ReceivedState';

describe('Given a InProgressState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new InProgressState(order));
  });

  it('when nextState method is called order.getState() should return ReceivedState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(ReceivedState);
  });
  it('when cancelByUser method is called order.getState() should return InProgressState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(InProgressState);
  });
  it('when cancelByRestaurant method is called order.getState() should return InProgressState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(InProgressState);
  });
  it('when reject method is called order.getState() should return InProgressState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(InProgressState);
  });
});
