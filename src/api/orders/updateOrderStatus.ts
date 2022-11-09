import type {OrderStatus, OrderType} from 'src/@types/order';
import {STORAGE} from 'src/config';

type OrderRepository = {
  save: (orderId: string, status: OrderStatus) => Promise<void>;
};

class StorageOrderRepository implements OrderRepository {
  async save(orderId: string, status: OrderStatus) {
    const storedOrder = localStorage.getItem(STORAGE.orders);

    if (storedOrder === null) {
      return Promise.reject();
    }

    const order: OrderType = JSON.parse(storedOrder) as OrderType;
    if (order.id !== orderId) {
      return Promise.reject();
    }

    order.status = status;

    localStorage.setItem(STORAGE.orders, JSON.stringify(order));

    return Promise.resolve();
  }
}

const storage: OrderRepository = new StorageOrderRepository();

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  if (orderId === undefined || status === undefined) {
    throw new Error('Invalid parameters');
  }

  return storage.save(orderId, status);
};
