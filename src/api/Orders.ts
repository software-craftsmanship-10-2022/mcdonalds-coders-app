import {PaymentMethodType} from '~types/order';
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
   * Change the `confirm` flag in the order.
   *
   * @param value new value.
   */
  confirm(value: boolean): void {
    this.order.confirmed = value;
  }

  /**
   * Check if the order is confirmed.
   */
  hasConfirm(): boolean {
    return this.order.confirmed;
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
  getPayment(): PaymentMethodType {
    return this.order.payment;
  }

  /**
   * Set a `newPayment` param as new payment method in the order.
   *
   * @param newPayment New payment method.
   */
  setPayment(newPayment: PaymentMethodType): void {
    this.order.payment = newPayment;
  }

  /**
   * Get the order details.
   */
  getDetails(): NewOrderAddressDetailsType {
    return this.order.details;
  }
}

// @TODO Temporal id generator
let counter = 1;

// @TODO Temporal function that simulate js sleep
const sleep = async (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

/**
 * Creates in back a new empty order.
 *
 * @TODO Now the function simulates a back connection.
 *
 * @return new created empty order.
 */
async function createEmptyOrder(): Promise<Order> {
  const details: NewOrderAddressDetailsType = {
    id: counter++,
    name: '',
    address: '',
    image: '',
    isDelivery: false,
  };

  // @TODO simulate delay
  await sleep(100);

  return new Order({
    details,
    id: counter++,
    items: [],
    confirmed: false,
    payment: PaymentMethodType.cash,
  });
}

export {Order, createEmptyOrder};
