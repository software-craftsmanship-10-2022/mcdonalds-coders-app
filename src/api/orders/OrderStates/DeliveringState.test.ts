import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import DeliveringState from './DeliveringState';
import FinishedState from './FinishedState';

describe('Given a DeliveringState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new DeliveringState(order));
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

  it('when an nextState is called order.getState() should return FinishedState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(FinishedState);
  });

  it('when an cancelByUser is called order.getState() should return DeliveringState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(DeliveringState);
  });
  it('when an cancelByRestaurant is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when an reject is called order.getState() should return DeliveringState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(DeliveringState);
  });
});
