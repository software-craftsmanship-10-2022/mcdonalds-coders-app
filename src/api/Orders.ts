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
   * Get all items in the `order.items` list.
   *
   * @return
   */
  getItems(): MenuType[] {
    return this.order.items as MenuType[];
  }

  /**
   * Remove the item in`index` position from the `order.items` list.
   *
   * @param index Item position.
   * @throws Error The index is out of range.
   */
  removeItem(index: number): void {
    if (index < 0 || index >= this.order.items.length) {
      throw new Error(`Index ${index} out of range.`);
    }

    this.order.items.splice(index, 1);
  }

  /**
   * Remove all items in  the `order.items` list.
   */
  resetItems(): void {
    this.order.items = [];
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

  /**
   * Set new details object.
   *
   * @param details new Details.
   */
  setDetails(details: NewOrderAddressDetailsType) {
    this.order.details = details;
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
 * Order storage hook.
 */
export type UseOrderStorageType = {
  storageKey: string;
  setOrder: (_: Order) => Promise<void>;
  getOrder: () => Promise<Order | undefined>;
  removeOrder: () => Promise<void>;
};

export function useOrderStorage(): UseOrderStorageType {
  /**
   * Storage key used to read/write the current order
   */
  const storageKey = 'currentOrder';

  /**
   * Set in the cache system, the `order` order.
   *
   * @param order Order to store.
   */
  async function setOrder(order: Order): Promise<void> {
    await cache.setItem<Order>(storageKey, order);
  }

  type OrderInStorageType = {order: NewOrderType} | undefined;

  /**
   * Get from the cache system the stored order.
   *
   * @return Order instance.
   */
  async function getOrder(): Promise<Order | undefined> {
    const order: OrderInStorageType = await cache.getItem<OrderInStorageType>(storageKey);
    return order === undefined ? undefined : new Order(order.order);
  }

  /**
   * Remove the order from cache system.
   */
  async function removeOrder(): Promise<void> {
    await cache.removeItem(storageKey);
  }

  return {
    storageKey,
    setOrder,
    getOrder,
    removeOrder,
  };
}
