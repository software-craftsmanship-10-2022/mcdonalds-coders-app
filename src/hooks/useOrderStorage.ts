import type OrderState from 'src/api/orders/OrderStates/OrderState';
import type {NewOrderType} from '../@types/order';
import Order from '../api/orders/Order';
import {storage} from '../utils/localStorage';

/**
 * Order storage hook.
 */
export type UseOrderStorageType = {
  storageStateKey: string;
  storageOrderKey: string;
  setOrder: (_: Order) => Promise<void>;
  getOrder: () => Promise<Order | undefined>;
  removeOrder: () => Promise<void>;
};

export function useOrderStorage(): UseOrderStorageType {
  /**
   * Storage key used to read/write the current order
   */
  const storageOrderKey = 'order';
  const storageStateKey = 'state';

  /**
   * Set in the cache system, the `order` order.
   *
   * @param order Order to store.
   */
  async function setOrder(order: Order): Promise<void> {
    const stateCode = order.getStateCode();

    await storage.setItem<Order>(storageOrderKey, order);

    // Await storage.setItem<OrderStateType>(storageStateKey, ORDER_STATES[stateCode]});
  }

  type OrderInStorageType = NewOrderType | undefined;
  type OrderStateInStorageType = OrderState | undefined;

  /**
   * Get from the cache system the stored order.
   *
   * @return Order instance.
   */
  async function getOrder(): Promise<Order | undefined> {
    const order: OrderInStorageType = await storage.getItem<OrderInStorageType>(storageOrderKey);
    const orderState: OrderStateInStorageType = await storage.getItem<OrderStateInStorageType>(
      storageStateKey,
    );
    if (order && orderState) {
      const newOrder = new Order(order);
      newOrder.changeState(orderState);
      return newOrder;
    }
  }

  /**
   * Remove the order from cache system.
   */
  async function removeOrder(): Promise<void> {
    await storage.removeItem(storageOrderKey);
    await storage.removeItem(storageStateKey);
  }

  return {
    storageOrderKey,
    storageStateKey,
    setOrder,
    getOrder,
    removeOrder,
  };
}
