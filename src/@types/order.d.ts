import type {ProductType} from './product';

// @types.order.ts
export type OrderType = {
  details: OrderAddressDetailsType;
  items: OrderItemType[];
  total: number;
  confirmed: boolean;
  paymentType: string;
};

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
