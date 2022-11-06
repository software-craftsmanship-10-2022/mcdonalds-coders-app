import {OrderStatus, PaymentMethod} from '~types/order';
import type {MenuType} from '~types/product';
import {createEmptyOrder, Order} from './Orders';

describe('Check class Order', () => {
  let order: Order;

  beforeEach(() => {
    order = new Order({
      id: 1,
      details: {
        id: 2,
        name: 'user 1',
        address: '123 Fake street',
        image: 'avatar',
      },
      items: [],
      payment: PaymentMethod.cash,
      status: OrderStatus.pending,
    });
  });

  it('gets the order id', () => {
    expect(order.getId()).toBe(1);
  });

  describe('Check `order.items` property', () => {
    it('is empty', () => {
      expect(order.isItemsEmpty()).toBe(true);
    });

    it("isn't empty when add a new item", () => {
      order.addItem(1 as unknown as MenuType);
      expect(order.isItemsEmpty()).toBe(false);
    });
  });

  it('is *cash* payment method', () => {
    expect(order.getPayment()).toBe(PaymentMethod.cash);
  });

  it('changes the payment method', () => {
    expect(order.getPayment()).toBe(PaymentMethod.cash);
    order.setPayment(PaymentMethod.debit);
    expect(order.getPayment()).toBe(PaymentMethod.debit);
  });

  it('gets order status', () => {
    expect(order.getStatus()).toBe(OrderStatus.pending);
  });

  it('gets the details', () => {
    expect(order.getDetails()).toEqual({
      id: 2,
      name: 'user 1',
      address: '123 Fake street',
      image: 'avatar',
    });
  });
});

describe('Test function `createEmptyOrder`', () => {
  let order: Order;

  beforeEach(() => {
    order = createEmptyOrder();
  });

  it('gets a Order instance', () => {
    expect(order).toBeInstanceOf(Order);
  });

  it('gets an Order it is empty', () => {
    expect(order.getId()).toBe(0);
    expect(order.isItemsEmpty()).toBe(true);
    expect(order.getPayment()).toBe(PaymentMethod.cash);
    expect(order.getStatus()).toBe(OrderStatus.pending);
    expect(order.getDetails()).toEqual({
      id: 0,
      name: '',
      address: '',
      image: '',
    });
  });
});
