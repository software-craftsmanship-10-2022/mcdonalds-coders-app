import {PaymentMethod} from 'src/@types/order';
import createEmptyOrder from './createEmptyOrder';
import {Order} from './Orders';

describe('Test function `createEmptyOrder`', () => {
  let order: Order;

  beforeEach(() => {
    order = createEmptyOrder();
  });

  it('gets a Order instance', () => {
    expect(order).toBeInstanceOf(Order);
  });

  it('gets an Order it is empty', () => {
    expect(order.getId()).toBe('');
    expect(order.isItemsEmpty()).toBe(true);
    expect(order.getPayment()).toBe(PaymentMethod.cash);
    expect(order.isConfirmed()).toBe(false);
    expect(order.getDetails()).toEqual({
      id: '',
      name: '',
      address: '',
      image: '',
      isDelivery: false,
    });
  });
});
