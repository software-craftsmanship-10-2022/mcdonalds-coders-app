import type {OrderStatus} from 'src/@types/order';

type OrderRepository = {
  save: (orderId: string) => Promise<void>;
};

class StorageOrderRepository implements OrderRepository {
  async save(orderId: string) {
    return Promise.resolve();
  }
}

const storage: OrderRepository = new StorageOrderRepository();

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  if (orderId === undefined || status === undefined) {
    throw new Error('Invalid parameters');
  }

  return storage.save(orderId);
};
