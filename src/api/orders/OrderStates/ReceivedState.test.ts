import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import ConfirmedState from './ConfirmedState';
import ReceivedState from './ReceivedState';
import RejectedState from './RejectedState';

describe('Given a ReceivedState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new ReceivedState(order));
  });

  it('when an ReceivedState instance is created then nextStep() method should be defined', () => {
    expect(order.getState().nextStep).toBeDefined();
  });

  it('when an ReceivedState instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().cancelByUser).toBeDefined();
  });

  it('when an ReceivedState instance is created then cancelByRestaurant() method should be defined', () => {
    expect(order.getState().cancelByRestaurant).toBeDefined();
  });

  it('when an ReceivedState instance is created then reject() method should be defined', () => {
    expect(order.getState().reject).toBeDefined();
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
