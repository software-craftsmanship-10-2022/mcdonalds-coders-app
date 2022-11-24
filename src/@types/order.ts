import type Order from 'src/api/orders/Order';
import type {ORDER_STATES_CODES} from 'src/api/orders/OrderStates/constants';
import type {PaymentMethodType} from 'src/components/form/Payment/constants/paymentMethodsTypes';
import type {PaymentAmount} from 'src/Payment/models/PaymentAmount/PaymentAmount';
import type {MenuType} from './product';

export type OrderType = {
  paymentAmount: PaymentAmount;
  id: string;
  details: OrderAddressDetailsType;
  items: MenuType[];
  total: number;
  payment: PaymentMethod;
  confirmed: boolean;
  payment: PaymentMethodType;
  state: typeof ORDER_STATES_CODES;
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
