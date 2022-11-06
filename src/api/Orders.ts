import {PaymentMethod, OrderStatus} from '~types/order';
import type {NewOrderAddressDetailsType, NewOrderType} from '~types/order';
import type {MenuType} from '~types/product';

class Order {
  // @TODO calisthenics: this.order.items: use first-class collections
  /**
   * @param order Order to handle
   */
  constructor(private order: NewOrderType) {}

  /**
   * Get the order Id.
   */
  getId(): number {
    return this.order.id;
  }

  /**
   * Check if the `order.items` list is empty.
   */
  isItemsEmpty(): boolean {
    return this.order.items.length === 0;
  }

  /**
   * Add the `item` item in the `order.items` list.
   *
   * @param item new item.
   */
  addItem(item: MenuType): void {
    this.order.items.push(item);
  }

  /**
   * Get the order payment.
   */
  getPayment(): PaymentMethod {
    return this.order.payment;
  }

  /**
   * Set a `newPayment` param as new payment method in the order.
   *
   * @param newPayment New payment method.
   */
  setPayment(newPayment: PaymentMethod): void {
    this.order.payment = newPayment;
  }

  /**
   * Get the status of the order.
   */
  getStatus(): OrderStatus {
    return this.order.status;
  }

  /**
   * Get the order details.
   */
  getDetails(): NewOrderAddressDetailsType {
    return this.order.details;
  }
}

/**
 * Create a new empty order.
 *
 * @return new order.
 */
async function createEmptyOrder(): Promise<Order> {
  const details: NewOrderAddressDetailsType = {
    id: 0,
    name: '',
    address: '',
    image: '',
  };

  return new Order({
    details,
    id: 0,
    items: [],
    payment: PaymentMethod.cash,
    status: OrderStatus.pending,
  });
}

export {Order, createEmptyOrder};
