import {OrderStatus} from 'src/@types/order';

interface OrderRepository {
  save: (orderId: string) => Promise<void>;
}

class StorageOrderRepository implements OrderRepository {
  save(orderId: string) {
    return Promise.resolve();
  }
}

const storage: OrderRepository = new StorageOrderRepository();

export const updateOrderStatus = (orderId: string, status: OrderStatus): Promise<void> => {
  if (orderId === undefined || status === undefined) {
    throw new Error('Invalid parameters');
  }

  return storage.save(orderId);
};
