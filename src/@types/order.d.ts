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

/// NEW TYPES
// @TODO Replace in future the *New* types by the Old types
export enum PaymentMethod {
  cash,
  debit,
}

export enum OrderStatus {
  pending,
  preparing,
  delivering,
}

export type NewOrderType = {
  id: number;
  details: NewOrderAddressDetailsType;
  items: MenuType[];
  payment: PaymentMethod;
  status: OrderStatus;
};

export type NewOrderAddressDetailsType = {
  id: number;
  name: string;
  address: string;
  image: string;
};
