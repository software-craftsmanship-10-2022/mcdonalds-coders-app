import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import RejectedState from './RejectedState';

describe('Given a RejectedState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new RejectedState(order));
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().nextStep).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().cancelByUser).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().cancelByRestaurant).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().reject).toBeDefined();
  });
  it('when an nextState is called order.getState() should return RejectedState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });

  it('when an cancelByUser is called order.getState() should return RejectedState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });
  it('when an cancelByRestaurant is called order.getState() should return RejectedState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });
  it('when an reject is called order.getState() should return RejectedState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(RejectedState);
  });
});
