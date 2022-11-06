import {clearAll, getItem, setItem} from '../hooks/cacheSystem';
import {OrderStatus, PaymentMethod} from '../@types/order.d';
import type {MenuType} from '../@types/product.d';
import {
  createEmptyOrder,
  Order,
  ORDER_STORAGE_KEY,
  setOrderInStorage,
  getOrderFromStorage,
  removeOrderFromStorage,
} from './Orders';

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

describe('Manipulate the Order object in cache system', () => {
  let order: Order;

  beforeEach(async () => {
    order = createEmptyOrder();
    await clearAll();
  });

  it('writes the order in the cache system', async () => {
    await setOrderInStorage(order);
    expect(await getItem<Order>(ORDER_STORAGE_KEY)).toEqual(order);
  });

  it("tries to read the order when it wasn't created", async () => {
    expect(await getOrderFromStorage()).toBe(undefined);
  });

  it('reads an object it is instance of Order', async () => {
    await setItem<Order>(ORDER_STORAGE_KEY, order);
    expect(await getOrderFromStorage()).toBeInstanceOf(Order);
  });

  it('checks the object in cache system is an Order instance.', async () => {
    await setItem<Order>(ORDER_STORAGE_KEY, order);
    expect(await getOrderFromStorage()).toEqual(order);
  });

  it('Remove the object from cache system', async () => {
    await setItem<Order>(ORDER_STORAGE_KEY, order);
    await removeOrderFromStorage();
    expect(await getOrderFromStorage()).toBe(undefined);
  });
});
