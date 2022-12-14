import createEmptyOrder from '../createEmptyOrder';
import Order from '../Order';

describe('Test function `createEmptyOrder`', () => {
  let order: Order;

  beforeEach(() => {
    order = createEmptyOrder();
  });

  it('gets a Order instance', () => {
    expect(order).toBeInstanceOf(Order);
  });

  it('gets an Order it is empty', () => {
    expect(order.getId()).toBe('123');
    expect(order.isItemsEmpty()).toBe(true);

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
