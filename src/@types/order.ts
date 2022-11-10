import type {Order} from 'src/api/orders/Orders';
import type {MenuType} from './product.d';

// @types.order.ts
export type OrderType = {
  id: string;
  details: OrderAddressDetailsType;
  items: OrderItemType[];
  total: number;
  confirmed: boolean;
  paymentType: string;
  status: OrderStatus;
};

export enum OrderStatus {
  noConfirmed = 'NO_CONFIRMED',
  ready = 'READY',
  rejected = 'REJECTED',
  pending = 'PENDING',
  preparing = 'PREPARING',
  delivering = 'DELIVERING',
  finished = 'FINISHED',
}

export enum PaymentMethod {
  cash,
  debit,
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
  status: OrderStatus;
};

export type NewOrderAddressDetailsType = {
  id: string;
  name: string;
  address: string;
  image: string;
  isDelivery: boolean;
};
