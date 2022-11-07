import type {MenuType} from '../@types/product.d';
import {PaymentMethod, OrderStatus} from '../@types/order.d';
import type {NewOrderAddressDetailsType, NewOrderType} from '../@types/order.d';
import {cacheHandler as cache} from 'src/hooks/cacheSystem';

export class Order {
  // @TODO calisthenics: this.order.items: use first-class collections
  /**
   * @param order Order to handle
   */
  constructor(private order: NewOrderType) {}

  /**
   * Get the order Id.
   */
  getId(): number {
    return this.order.id;
  }

  /**
   * Check if the `order.items` list is empty.
   */
  isItemsEmpty(): boolean {
    return this.order.items.length === 0;
  }

  /**
   * Add the `item` item in the `order.items` list.
   *
   * @param item new item.
   */
  addItem(item: MenuType): void {
    this.order.items.push(item);
  }

  /**
   * Get the order payment.
   */
  getPayment(): PaymentMethod {
    return this.order.payment;
  }

  /**
   * Set a `newPayment` param as new payment method in the order.
   *
   * @param newPayment New payment method.
   */
  setPayment(newPayment: PaymentMethod): void {
    this.order.payment = newPayment;
  }

  /**
   * Get the status of the order.
   */
  getStatus(): OrderStatus {
    return this.order.status;
  }

  /**
   * Get the order details.
   */
  getDetails(): NewOrderAddressDetailsType {
    return this.order.details;
  }
}

/**
 * Create a new empty order.
 *
 * @return new order.
 */
export function createEmptyOrder(): Order {
  const details: NewOrderAddressDetailsType = {
    id: 0,
    name: '',
    address: '',
    image: '',
  };

  return new Order({
    details,
    id: 0,
    items: [],
    payment: PaymentMethod.cash,
    status: OrderStatus.pending,
  });
}

/**
 * Storage key used to read/write the current order
 */
export const ORDER_STORAGE_KEY = 'currentOrder';

/**
 * Set in the cache system, the `order` order.
 *
 * @param order Order to store.
 */
export async function setOrderInStorage(order: Order): Promise<void> {
  await cache.setItem<Order>(ORDER_STORAGE_KEY, order);
}

type OrderInStorageType = {order: NewOrderType} | undefined;

/**
 * Get from the cache system the stored order.
 *
 * @return Order instance.
 */
export async function getOrderFromStorage(): Promise<Order | undefined> {
  const order: OrderInStorageType = await cache.getItem<OrderInStorageType>(ORDER_STORAGE_KEY);
  return order === undefined ? undefined : new Order(order.order);
}

/**
 * Remove the order from cache system.
 */
export async function removeOrderFromStorage(): Promise<void> {
  await cache.removeItem(ORDER_STORAGE_KEY);
}
