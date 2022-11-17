import {MOCK_NEW_ORDER} from '../mocks/mocks';
import type Order from '../Order';
import ReceivedState from './ReceivedState';

describe('Given a ReceivedState class', () => {
  let order: Order;
  let state: ReceivedState;

  beforeEach(() => {
    order = MOCK_NEW_ORDER;
    state = new ReceivedState(order);
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
});
