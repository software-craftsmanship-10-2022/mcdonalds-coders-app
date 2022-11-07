import type OrderId from './ValueObject/OrderId';
import type OrderProduct from './ValueObject/OrderProduct';
import type OrderProductsCollection from './ValueObject/OrderProductsCollection';
import type OrderStatus from './ValueObject/OrderStatus';

export default class Order /* extends AggregateRoot */ {
  constructor(
    private readonly id: OrderId,
    private readonly products: OrderProductsCollection,
    private readonly status: OrderStatus,
  ) {
    this.id = id;
    this.products = products;
    this.status = status;
  }

  hasProducts(): boolean {
    if (this.products.count() > 0) {
      return true;
    }

    return false;
  }

  addProduct(product: OrderProduct): void {
    this.products.add(product);
  }

  removeProduct(product: OrderProduct): void {
    this.products.remove(product);
  }
}
