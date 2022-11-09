import {OrderStatus, PaymentMethod} from '../../@types/order';
import type {NewOrderAddressDetailsType} from '../../@types/order';
import type {MenuType} from '../../@types/product.d';
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
      status: OrderStatus.noConfirmed,
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

    it('gets the item list', () => {
      order.addItem(1 as unknown as MenuType);
      order.addItem(2 as unknown as MenuType);
      order.addItem(3 as unknown as MenuType);
      expect(order.getItems()).toEqual([1, 2, 3]);
    });

    it('removes the first item', () => {
      order.addItem(1 as unknown as MenuType);
      order.addItem(2 as unknown as MenuType);
      order.addItem(3 as unknown as MenuType);
      order.addItem(4 as unknown as MenuType);

      order.removeItem(0);
      expect(order.getItems()).toEqual([2, 3, 4]);
    });

    it('removes the last item', () => {
      order.addItem(1 as unknown as MenuType);
      order.addItem(2 as unknown as MenuType);
      order.addItem(3 as unknown as MenuType);
      order.addItem(4 as unknown as MenuType);

      order.removeItem(3);
      expect(order.getItems()).toEqual([1, 2, 3]);
    });

    it('removes other item differente', () => {
      order.addItem(1 as unknown as MenuType);
      order.addItem(2 as unknown as MenuType);
      order.addItem(3 as unknown as MenuType);
      order.addItem(4 as unknown as MenuType);

      order.removeItem(2);
      expect(order.getItems()).toEqual([1, 2, 4]);
    });

    it('uses an invalid index', function () {
      order.addItem(1 as unknown as MenuType);
      order.addItem(2 as unknown as MenuType);
      order.addItem(3 as unknown as MenuType);
      order.addItem(4 as unknown as MenuType);

      expect(() => {
        order.removeItem(-1);
      }).toThrowError('Index -1 out of range');

      expect(() => {
        order.removeItem(4);
      }).toThrowError('Index 4 out of range');
    });

    it('resets the item list', () => {
      order.addItem(1 as unknown as MenuType);
      order.addItem(2 as unknown as MenuType);
      order.addItem(3 as unknown as MenuType);

      order.resetItems();
      expect(order.isItemsEmpty()).toBe(true);
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
    expect(order.getStatus()).toBe(OrderStatus.noConfirmed);
  });

  it('sets new status', () => {
    order.setStatus(OrderStatus.delivering);
    expect(order.getStatus()).toBe(OrderStatus.delivering);
  });

  it('checks the order status is no confirmed', () => {
    expect(order.isConfirmed()).toBe(false);
  });

  it('checks the order status is confirmed', () => {
    order.setStatus(OrderStatus.pending);
    expect(order.isConfirmed()).toBe(true);
  });

  it('gets the details', () => {
    expect(order.getDetails()).toEqual({
      id: 2,
      name: 'user 1',
      address: '123 Fake street',
      image: 'avatar',
    });
  });

  it('set new details object', () => {
    const details: NewOrderAddressDetailsType = {
      id: 33,
      name: 'New name',
      address: 'New address',
      image: 'New image',
    };

    order.setDetails(details);
    expect(order.getDetails()).toEqual(details);
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
    expect(order.isConfirmed()).toBe(false);
    expect(order.getDetails()).toEqual({
      id: 0,
      name: '',
      address: '',
      image: '',
    });
  });
});
