// @types.order.ts
export type OrderType = {
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
