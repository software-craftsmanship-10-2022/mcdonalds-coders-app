import type OrderProduct from './OrderProduct';

export default class OrderProductsCollection {
  private products: OrderProduct[];

  constructor() {
    this.products = [];
  }

  add(product: OrderProduct): void {
    this.products.push(product);
  }

  remove(product: OrderProduct): void {
    this.products.forEach((item, index) => {
      if (item === product) this.products.splice(index, 1);
    });
  }

  clear(): void {
    this.products = [];
  }

  items(): OrderProduct[] {
    return this.products;
  }

  count(): number {
    return this.products.length;
  }
}
