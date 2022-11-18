import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import DeliveringState from './DeliveringState';
import ReadyState from './ReadyState';

describe('Given a ReadyState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new ReadyState(order));
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

  it('when an nextState is called order.getState() should return DeliveringState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(DeliveringState);
  });

  it('when an cancelByUser is called order.getState() should return ReadyState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(ReadyState);
  });
  it('when an cancelByRestaurant is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when an reject is called order.getState() should return ReadyState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(ReadyState);
  });
});