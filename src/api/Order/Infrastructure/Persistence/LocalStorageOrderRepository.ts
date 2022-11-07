import type Order from '~api/Order/Domain/Order';
import type OrderRepository from '~api/Order/Domain/OrderRepository';
import type OrderId from '~api/Order/Domain/ValueObject/OrderId';

export default class LocalStorageOrderRepository implements OrderRepository {
  findByOrderIdOrFail(id: OrderId): Order {
    throw new Error('Method not implemented.');
  }

  save(order: Order): void {
    throw new Error('Method not implemented.');
  }
}
