import {storage} from '../utils/localStorage';
import {Order} from '../api/orders/Orders';
import type {NewOrderType} from '../@types/order';

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
    await storage.setItem<Order>(storageKey, order);
  }

  type OrderInStorageType = {order: NewOrderType} | undefined;

  /**
   * Get from the cache system the stored order.
   *
   * @return Order instance.
   */
  async function getOrder(): Promise<Order | undefined> {
    const order: OrderInStorageType = await storage.getItem<OrderInStorageType>(storageKey);
    return order === undefined ? undefined : new Order(order.order);
  }

  /**
   * Remove the order from cache system.
   */
  async function removeOrder(): Promise<void> {
    await storage.removeItem(storageKey);
  }

  return {
    storageKey,
    setOrder,
    getOrder,
    removeOrder,
  };
}
