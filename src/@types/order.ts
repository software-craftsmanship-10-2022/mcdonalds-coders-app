import type Order from 'src/api/orders/Order';
import type {MenuType} from './product';

// @types.order.ts
export type OrderType = {
  id: string;
  details: OrderAddressDetailsType;
  items: MenuType[];
  total: number;
  payment: PaymentMethod;
  confirmed: boolean;
  paymentType: string;
  status: typeof ORDER_STATES_CODES;
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
  id: string;
  name: string;
  address: string;
  image: string;
  isDelivery: boolean;
};

export type OrderContextType = {
  updateOrder: (_: Order) => void;
  order: Order;
  resetOrder: () => void;
};
