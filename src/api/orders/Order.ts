import type {PaymentMethodType} from 'src/components/form/Payment/constants/paymentMethodsTypes';
import type {PaymentAmount} from 'src/Payment/models/PaymentAmount/PaymentAmount';
import type {NewOrderAddressDetailsType, NewOrderType} from '../../@types/order';
import type {MenuType} from '../../@types/product.d';
import {ORDER_STATES_CODES} from './OrderStates/constants';
import InProgressState from './OrderStates/InProgressState';
import type OrderState from './OrderStates/OrderState';

export default class Order {
  // @TODO calisthenics: this.order.items: use first-class collections
  /**
   * @param order Order to handle
   */
  #state: OrderState;
  constructor(private order: NewOrderType) {
    this.#state = new InProgressState(this);
  }

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
   * Get the order Id.
   */
  getState(): OrderState {
    return this.#state;
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

  /**
   * Set the payment amount of the items with the donation and other values.
   */
  setPaymentAmount(paymentAmount: PaymentAmount): void {
    this.order.paymentAmount = paymentAmount;
  }

  /**
   * Get the payment amount of the items with the donation and other values.
   */
  getPaymentAmount(): PaymentAmount {
    return this.order.paymentAmount;
  }

  getTotalPriceByMenu(menuId: string) {
    return this.order.items
      .filter((item) => item.id === menuId)
      .reduce((total, {price}) => total + price, 0);
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
   * Get the status of the order.
   */
  getStatus(): string {
    return this.#state.getCode();
  }

  /**
   * Check if the order status is not confirmed.
   */
  isConfirmed(): boolean {
    return this.#state.getCode() === ORDER_STATES_CODES.confirmedState;
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

  changeState(state: OrderState) {
    this.#state = state;
  }

  nextStep() {
    this.#state.nextStep();
  }

  cancelByUser() {
    this.#state.cancelByUser();
  }

  cancelByRestaurant() {
    this.#state.cancelByRestaurant();
  }

  reject() {
    this.#state.reject();
  }
}
