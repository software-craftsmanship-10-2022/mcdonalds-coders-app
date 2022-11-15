import type {NewOrder, NewOrderType, OrderStatus} from 'src/@types/order';
import {STORAGE} from 'src/config';
import type {OrderRepository} from '../domain/OrderRepository';

class StorageOrderRepository implements OrderRepository {
  async save(orderId: string, status: OrderStatus) {
    const order = this.checkOrderOrFail(orderId);

    order.status = status;

    localStorage.setItem(STORAGE.orders, JSON.stringify(order));

    return Promise.resolve();
  }

  private checkOrderOrFail(orderId: string): NewOrderType {
    const storedOrder = localStorage.getItem(STORAGE.orders);
    if (storedOrder === null) {
      throw new Error();
    }

    return this.parseOrder(storedOrder, orderId);
  }

  private parseOrder(storedOrder: string, orderId: string): NewOrderType {
    const {order}: NewOrder = JSON.parse(storedOrder) as NewOrder;

    if (order.id !== orderId) {
      throw new Error();
    }

    return order;
  }
}

export const storage: OrderRepository = new StorageOrderRepository();
