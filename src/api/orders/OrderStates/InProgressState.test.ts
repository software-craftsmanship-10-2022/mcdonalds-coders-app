import {MOCK_NEW_ORDER} from '../mocks/mocks';
import type Order from '../Order';
import InProgressState from './InProgressState';
import ReceivedState from './ReceivedState';

describe('Given a InProgressState class', () => {
  let order: Order;
  let state: InProgressState;

  beforeEach(() => {
    order = MOCK_NEW_ORDER;
    state = new InProgressState(order);
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(state.nextStep).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(state.cancelByUser).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(state.cancelByRestaurant).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    expect(state.reject).toBeDefined();
  });

  it('when an nextState is called order.getState() should return ReceivedState', () => {
    state.nextStep();
    expect(order.getState()).toBeInstanceOf(ReceivedState);
  });
});
