<<<<<<< HEAD
import {mockNewOrder} from '../../mocks/mocks';
import type Order from '../../Order';
import {ORDER_STATES} from '../constants';
=======
import type Order from '../../Order';
import {mockNewOrder} from '../mocks/mocks';
>>>>>>> aae9c3d (Squashed commit of the following:)
import OrderState from '../OrderState';

describe('Given a OrderState class', () => {
  let order: Order;

<<<<<<< HEAD
  beforeEach(() => {
    order = mockNewOrder();
  });
  const IN_PROGRESS_CODE = 'inProgressState';

  it('when an instance is created then nextStep() method should be defined', () => {
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
=======
  const STATE_CODE = 'Test code';
  beforeEach(() => {
    order = mockNewOrder();
  });

  it('when an instance is created then nextStep() method should be defined', () => {
    const orderState = new OrderState(order, STATE_CODE);
>>>>>>> aae9c3d (Squashed commit of the following:)
    expect(orderState.nextStep).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
<<<<<<< HEAD
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
=======
    const orderState = new OrderState(order, STATE_CODE);
>>>>>>> aae9c3d (Squashed commit of the following:)
    expect(orderState.cancelByUser).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByRestaurant() method should be defined', () => {
<<<<<<< HEAD
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
=======
    const orderState = new OrderState(order, STATE_CODE);
>>>>>>> aae9c3d (Squashed commit of the following:)
    expect(orderState.cancelByRestaurant).toBeInstanceOf(Function);
  });

  it('when an instance is created then reject() method should be defined', () => {
<<<<<<< HEAD
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
=======
    const orderState = new OrderState(order, STATE_CODE);
>>>>>>> aae9c3d (Squashed commit of the following:)
    expect(orderState.reject).toBeInstanceOf(Function);
  });

  it('when an instance is created then getDescription() method should be constructor description', () => {
<<<<<<< HEAD
    const orderState = new OrderState(order, ORDER_STATES.inProgressState);
    expect(orderState.getCode()).toBe(IN_PROGRESS_CODE);
=======
    const orderState = new OrderState(order, STATE_CODE);
    expect(orderState.getCode()).toBe(STATE_CODE);
>>>>>>> aae9c3d (Squashed commit of the following:)
  });
});
