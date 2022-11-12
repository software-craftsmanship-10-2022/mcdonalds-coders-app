import type {ProductType} from './product';

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
  pending = 'PENDING',
  preparing = 'PREPARING',
  delivering = 'DELIVERING',
  finished = 'FINISHED',
}

export type OrderItemType = {
  quantity: number;
  name: string;
  img: string;
  pricePerUnit: number;
  complement: ProductType | undefined;
  drink: ProductType | undefined;
};

export type OrderAddressDetailsType = {
  name: string;
  address: string;
  img: string;
  isDelivery: boolean;
};

export type OrderContextType = {
  order: OrderType;
  updateOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  resetOrder: () => void;
};
