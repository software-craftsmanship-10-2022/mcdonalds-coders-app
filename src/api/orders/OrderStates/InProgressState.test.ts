import {mockNewOrder} from '../mocks/mocks';
import type Order from '../Order';
import InProgressState from './InProgressState';
import ReceivedState from './ReceivedState';

describe('Given a InProgressState class', () => {
  let order: Order;

  beforeEach(() => {
    order = mockNewOrder();
    order.changeState(new InProgressState(order));
  });

  it('when an instance is created then nexStep() method should be defined', () => {
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
