import {OrderStatus, PaymentMethod} from 'src/@types/order';
import Order from '../Order';
import OrderState from './OrderState';

describe('Given a OrderState class', () => {
  let order: Order;

  beforeEach(() => {
    order = new Order({
      id: '1a',
      details: {
        id: '2a',
        name: 'user 1',
        address: '123 Fake street',
        image: 'avatar',
        isDelivery: false,
      },
      items: [],
      payment: PaymentMethod.cash,
      status: OrderStatus.noConfirmed,
    });
  });

  it('when an instance is created then nextStep() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.nextStep).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByUser() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.cancelByUser).toBeInstanceOf(Function);
  });

  it('when an instance is created then cancelByRestaurant() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.cancelByRestaurant).toBeInstanceOf(Function);
  });

  it('when an instance is created then reject() method should be defined', () => {
    const orderState = new OrderState(order);
    expect(orderState.reject).toBeInstanceOf(Function);
  });
});
