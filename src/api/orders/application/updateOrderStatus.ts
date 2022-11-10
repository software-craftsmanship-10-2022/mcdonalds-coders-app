import type {OrderStatus} from 'src/@types/order';
import {storage} from '../infrastructure/StorageOrderRepository';

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  if (!orderId || !status) {
    throw new Error('Invalid order ID or status arguments');
  }

  return storage.save(orderId, status);
};
