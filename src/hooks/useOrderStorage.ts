import type {OrderType} from 'src/@types/order';
import CancelledByRestaurantState from 'src/api/orders/OrderStates/CancelledByRestaurantState';
import CancelledByUserState from 'src/api/orders/OrderStates/CancelledByUserState';
import ConfirmedState from 'src/api/orders/OrderStates/ConfirmedState';
import type {OrderStateType} from 'src/api/orders/OrderStates/constants';
import {ORDER_STATES} from 'src/api/orders/OrderStates/constants';
import DeliveringState from 'src/api/orders/OrderStates/DeliveringState';
import FinishedState from 'src/api/orders/OrderStates/FinishedState';
import InProgressState from 'src/api/orders/OrderStates/InProgressState';
import PreparingState from 'src/api/orders/OrderStates/PreparingState';
import ReadyState from 'src/api/orders/OrderStates/ReadyState';
import ReceivedState from 'src/api/orders/OrderStates/ReceivedState';
import RejectedState from 'src/api/orders/OrderStates/RejectedState';
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
    await storage.setItem<OrderType>(storageOrderKey, order.toOrderType());
    await storage.setItem<OrderStateType>(storageStateKey, ORDER_STATES[stateCode]);
  }

  type OrderInStorageType = {order: OrderType} | undefined;
  type OrderStateInStorageType = OrderStateType | undefined;

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
    let newOrder;
    if (order) {
      newOrder = new Order(order.order);
      if (orderState) {
        const state = getStateOrderByCode(orderState.code, newOrder);
        newOrder.changeState(state);
      }
    }

    return newOrder;
  }

  function getStateOrderByCode(code: string, newOrder: Order) {
    switch (code) {
      case ORDER_STATES.receivedState.code:
        return new ReceivedState(newOrder);
      case ORDER_STATES.confirmedState.code:
        return new ConfirmedState(newOrder);
      case ORDER_STATES.readyState.code:
        return new ReadyState(newOrder);
      case ORDER_STATES.preparingState.code:
        return new PreparingState(newOrder);
      case ORDER_STATES.rejectedState.code:
        return new RejectedState(newOrder);
      case ORDER_STATES.cancelledByRestaurantState.code:
        return new CancelledByRestaurantState(newOrder);
      case ORDER_STATES.cancelledByUserState.code:
        return new CancelledByUserState(newOrder);
      case ORDER_STATES.deliveringState.code:
        return new DeliveringState(newOrder);
      case ORDER_STATES.finishedState.code:
        return new FinishedState(newOrder);
      default:
        return new InProgressState(newOrder);
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
