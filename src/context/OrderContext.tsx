import { createContext, useContext, useEffect, useState } from "react";
import type { OrderContextType, OrderType } from "../@types/order";
import { STORAGE } from "../config";
import useLocalStorage from "../hooks/useLocalStorage";

const OrderContext = createContext<OrderContextType | undefined>(null);

export const useOrderContext = () =>
  useContext(OrderContext)!;

type OrderProviderProps = {
  children?: React.ReactNode;
};

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const { getStorageItem, setStorageItem } = useLocalStorage();

  const getNewOrder = (): OrderType => ({
    items: [],
    details: {
      name: "",
      address: "",
      img: "",
      isDelivery: false,
    },
    total: 0,
    confirmed: false,
    paymentType: "",
  });

  const getInitialState = () => {
    const order = getStorageItem(STORAGE.ORDER) as OrderType;

    if (!order) {
      setStorageItem(STORAGE.ORDER, getNewOrder());
      return getStorageItem(STORAGE.ORDER) as OrderType;
    }

    return order;
  };

  const [order, setOrder] = useState(getInitialState);

  useEffect(() => {
    if (!order) {
      setOrder(getNewOrder());
    }

    setStorageItem(STORAGE.ORDER, order);
  }, [order, setStorageItem]);

  const resetOrder = () => { setOrder(getNewOrder()); };

  return (
    <OrderContext.Provider value={{ order, updateOrder: setOrder, resetOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
