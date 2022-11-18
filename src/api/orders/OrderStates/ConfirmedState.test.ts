import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import CancelledByRestaurantState from './CancelledByRestaurantState';
import CancelledByUserState from './CancelledByUserState';
import ConfirmedState from './ConfirmedState';
import PreparingState from './PreparingState';

describe('Given a ConfirmedState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new ConfirmedState(order));
  });

  it('when an instance is created then nextStep() method should be defined', () => {
    expect(order.getState().nextStep).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(order.getState().cancelByUser).toBeDefined();
  });

  it('when an instance is created then cancelByRestaurant() method should be defined', () => {
    expect(order.getState().cancelByRestaurant).toBeDefined();
  });

  it('when an instance is created then reject() method should be defined', () => {
    expect(order.getState().reject).toBeDefined();
  });

  it('when nextState method is called order.getState() should return PreparingState', () => {
    order.getState().nextStep();
    expect(order.getState()).toBeInstanceOf(PreparingState);
  });

  it('when cancelByUser method is called order.getState() should return CancelledByUserState', () => {
    order.getState().cancelByUser();
    expect(order.getState()).toBeInstanceOf(CancelledByUserState);
  });
  it('when cancelByRestaurant method is called order.getState() should return CancelledByRestaurantState', () => {
    order.getState().cancelByRestaurant();
    expect(order.getState()).toBeInstanceOf(CancelledByRestaurantState);
  });
  it('when reject method is called order.getState() should return ConfirmedState', () => {
    order.getState().reject();
    expect(order.getState()).toBeInstanceOf(ConfirmedState);
  });
});
