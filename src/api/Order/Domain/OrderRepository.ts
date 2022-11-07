import type Order from './Order';
import type OrderId from './ValueObject/OrderId';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface OrderRepository {
  findByOrderIdOrFail(id: OrderId): Order;
  save(order: Order): void;
}
