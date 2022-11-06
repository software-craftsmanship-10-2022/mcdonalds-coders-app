export enum PaymentMethodType {
  cash,
  debit,
}

export type OrderType = {
  id: number;
  details?: OrderAddressDetailsType;
  items: MenuType[];
  confirmed: boolean;
  payment: PaymentMethodType;
};

export type OrderAddressDetailsType = {
  id: number;
  name: string;
  address: string;
  image: string;
  isDelivery: boolean;
};

export type OrderContextType = {
  order: OrderType;
  updateOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  resetOrder: () => void;
};
