import {MOCK_NEW_ORDER} from '../mocks/mocks';
import type Order from '../Order';

describe('Given a OrderState class', () => {
  let order: Order;

  beforeEach(() => {
    order = MOCK_NEW_ORDER;
  });

  it('when an instance is created then cancelByUser() method should return void', () => {
    expect(order.nextStep).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should return void', () => {
    expect(order.cancelByUser).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should return void', () => {
    expect(order.cancelByRestaurant).toBeDefined();
  });

  it('when an instance is created then cancelByUser() method should return void', () => {
    expect(order.reject).toBeDefined();
  });
});
