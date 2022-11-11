import type {MenuType} from '../../@types/product.d';
import type {NewOrderAddressDetailsType, NewOrderType} from '../../@types/order';
import {OrderStatus, PaymentMethod} from '../../@types/order';

export class Order {
  // @TODO calisthenics: this.order.items: use first-class collections
  /**
   * @param order Order to handle
   */
  constructor(private order: NewOrderType) {}

  /**
   * Get the order Id.
   */
  getId(): string {
    return this.order.id;
  }

  /**
   * Set a new id.
   *
   * @param newId
   */
  setId(newId: string) {
    this.order.id = newId;
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
   * Get all items in the `order.items` list.
   *
   * @return
   */
  getItems(): MenuType[] {
    return this.order.items;
  }

  /**
   * Remove the item in`index` position from the `order.items` list.
   *
   * @param index Item position.
   * @throws Error The index is out of range.
   */
  removeItem(index: number): void {
    if (index < 0 || index >= this.order.items.length) {
      throw new Error(`Index ${index} out of range.`);
    }

    this.order.items.splice(index, 1);
  }

  /**
   * Remove all items in  the `order.items` list.
   */
  resetItems(): void {
    this.order.items = [];
  }

  /**
   * Get the price total of the items in the `items` list.
   */
  getTotalPrice(): number {
    return this.order.items.reduce((total: number, {price}) => total + price, 0);
  }

  getTotalPriceByMenu(menuId: string) {
    return this.order.items
      .filter((item) => item.id === menuId)
      .reduce((total, {price}) => total + price, 0);
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
   * Sets new order status.
   *
   * @param newStatus New status
   */
  setStatus(newStatus: OrderStatus): void {
    this.order.status = newStatus;
  }

  /**
   * Check if the order status is not confirmed.
   */
  isConfirmed(): boolean {
    return this.getStatus() !== OrderStatus.noConfirmed;
  }

  /**
   * Get the order details.
   */
  getDetails(): NewOrderAddressDetailsType {
    return this.order.details;
  }

  /**
   * Set new details object.
   *
   * @param details new Details.
   */
  setDetails(details: NewOrderAddressDetailsType) {
    this.order.details = details;
  }

  /**
   * Get a copy of the instance.
   */
  clone(): Order {
    const details: NewOrderAddressDetailsType = {...this.order.details};
    return new Order({...this.order, details});
  }
}

/**
 * Create a new empty order.
 *
 * @return new order.
 */
export function createEmptyOrder(): Order {
  const details: NewOrderAddressDetailsType = {
    id: '',
    name: '',
    address: '',
    image: '',
    isDelivery: false,
  };

  return new Order({
    details,
    id: '',
    items: [],
    payment: PaymentMethod.cash,
    status: OrderStatus.noConfirmed,
  });
}
