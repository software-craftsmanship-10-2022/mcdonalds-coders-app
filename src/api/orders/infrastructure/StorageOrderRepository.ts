import type {OrderType} from 'src/@types/order';
import {STORAGE} from 'src/config';
import type {OrderRepository} from '../domain/OrderRepository';

class StorageOrderRepository implements OrderRepository {
  async save(orderId: string) {
    const order = this.checkOrderOrFail(orderId);
    localStorage.setItem(STORAGE.orders, JSON.stringify(order));
    return Promise.resolve();
  }

  private checkOrderOrFail(orderId: string): OrderType {
    const storedOrder = localStorage.getItem(STORAGE.orders);
    if (storedOrder === null) {
      throw new Error();
    }

    return this.parseOrder(storedOrder, orderId);
  }

  private parseOrder(storedOrder: string, orderId: string): OrderType {
    const order: OrderType = JSON.parse(storedOrder) as OrderType;

    if (order.id !== orderId) {
      throw new Error();
    }

    return order;
  }
}

export const storage: OrderRepository = new StorageOrderRepository();
