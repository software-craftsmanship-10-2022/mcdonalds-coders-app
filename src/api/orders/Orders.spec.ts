import {OrderStatus, PaymentMethod} from '../../@types/order';
import type {NewOrderAddressDetailsType} from '../../@types/order';
import type {MenuType} from '../../@types/product.d';
import {createEmptyOrder, Order} from './Orders';

describe('Check class Order', () => {
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

  it('gets the order id', () => {
    expect(order.getId()).toBe('1a');
  });

  it('sets new order id', () => {
    order.setId('new id');
    expect(order.getId()).toBe('new id');
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
      id: '2a',
      name: 'user 1',
      address: '123 Fake street',
      image: 'avatar',
      isDelivery: false,
    });
  });

  it('set new details object', () => {
    const details: NewOrderAddressDetailsType = {
      id: 'a33',
      name: 'New name',
      address: 'New address',
      image: 'New image',
      isDelivery: true,
    };

    order.setDetails(details);
    expect(order.getDetails()).toEqual(details);
  });

  it('calculates the total of the items', () => {
    // @TODO In future replace by real MenuType variables.
    order.addItem({price: 100} as unknown as MenuType);
    order.addItem({price: 200} as unknown as MenuType);
    order.addItem({price: 300} as unknown as MenuType);

    expect(order.getTotalPrice()).toBe(600);
  });

  it('calculates the total filtering by menu id', () => {
    // @TODO In future replace by real MenuType variables.
    order.addItem({price: 100, id: 'a'} as unknown as MenuType);
    order.addItem({price: 200, id: 'b'} as unknown as MenuType);
    order.addItem({price: 300, id: 'a'} as unknown as MenuType);
    order.addItem({price: 300, id: 'c'} as unknown as MenuType);
    order.addItem({price: 500, id: 'c'} as unknown as MenuType);

    expect(order.getTotalPriceByMenu('a')).toBe(400);
    expect(order.getTotalPriceByMenu('b')).toBe(200);
    expect(order.getTotalPriceByMenu('c')).toBe(800);
  });

  describe('`clone` function', () => {
    it('clones an instance of Order', () => {
      expect(order.clone()).toBeInstanceOf(Order);
    });

    it('clones an object with the same properties.', () => {
      expect(order.clone()).toEqual(order);
    });

    it('clones an object that is not the original object', () => {
      const clonedOrder = order.clone();
      expect(clonedOrder).not.toBe(order);
      expect(clonedOrder.getDetails()).not.toBe(order.getDetails());
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
