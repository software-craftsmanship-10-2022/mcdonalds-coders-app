import {PaymentMethodType} from '~types/order';
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
        isDelivery: false,
      },
      confirmed: false,
      items: [],
      payment: PaymentMethodType.cash,
    });
  });

  it('gets the order id', () => {
    expect(order.getId()).toBe(1);
  });

  it('checks the current value of `order.confirmed` is false', () => {
    expect(order.hasConfirm()).toBe(false);
  });

  it('changes the value of the `order.confirm` property', () => {
    order.confirm(true);
    expect(order.hasConfirm()).toBe(true);
    order.confirm(false);
    expect(order.hasConfirm()).toBe(false);
  });

  it('reads the value in the `order.confirm` property', () => {
    order.confirm(true);
    expect(order.hasConfirm()).toBe(true);
    order.confirm(false);
    expect(order.hasConfirm()).toBe(false);
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
    expect(order.getPayment()).toBe(PaymentMethodType.cash);
  });

  it('changes the payment method', () => {
    expect(order.getPayment()).toBe(PaymentMethodType.cash);
    order.setPayment(PaymentMethodType.debit);
    expect(order.getPayment()).toBe(PaymentMethodType.debit);
  });

  it('gets the details', () => {
    expect(order.getDetails()).toEqual({
      id: 2,
      name: 'user 1',
      address: '123 Fake street',
      image: 'avatar',
      isDelivery: false,
    });
  });
});

describe('Test function `createEmptyOrder`', () => {
  let order: Order;

  beforeEach(async () => {
    order = await createEmptyOrder();
  });

  it('gets a Order instance', async () => {
    expect(order).toBeInstanceOf(Order);
  });

  it('gets an Order it is empty', async () => {
    expect(order.getId()).toBe(4);
    expect(order.isItemsEmpty()).toBe(true);
    expect(order.hasConfirm()).toBe(false);
    expect(order.getPayment()).toBe(PaymentMethodType.cash);
    expect(order.getDetails()).toEqual({
      id: 3,
      name: '',
      address: '',
      image: '',
      isDelivery: false,
    });
  });
});
