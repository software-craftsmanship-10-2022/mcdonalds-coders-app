import type Order from 'src/api/orders/Order';
import type {ORDER_STATES} from 'src/api/orders/OrderStates/constants';
import type {MenuType} from './product.d';

// @types.order.ts
export type OrderType = {
  id: string;
  details: OrderAddressDetailsType;
  items: OrderItemType[];
  total: number;
  confirmed: boolean;
  paymentType: string;
  state: typeof ORDER_STATES;
};

export enum PaymentMethod {
  cash,
  debit,
  transfer,
}

export type OrderItemType = {
  quantity: number;
  name: string;
  img: string;
  pricePerUnit: number;
};

export type OrderAddressDetailsType = {
  name: string;
  address: string;
  img: string;
  isDelivery: boolean;
};

export type OrderContextType = {
  updateOrder: (_: Order) => void;
  order: Order;
  resetOrder: () => void;
};

export type NewOrderType = {
  id: string;
  details: NewOrderAddressDetailsType;
  items: MenuType[];
  payment: PaymentMethod;
};

export type NewOrderAddressDetailsType = {
  id: string;
  name: string;
  address: string;
  image: string;
  isDelivery: boolean;
};
