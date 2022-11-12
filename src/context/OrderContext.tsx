import {createContext, useContext, useEffect, useState} from 'react';
import type {OrderContextType, OrderType} from '../@types/order.d';
import {OrderStatus} from '../@types/order.d';
import {STORAGE} from '../config';
import useLocalStorage from '../hooks/useLocalStorage';

const ORDER_CONTEXT = createContext<OrderContextType | undefined>(undefined);

export const useOrderContext = () => useContext(ORDER_CONTEXT)!;

type OrderProviderProps = {
  children?: React.ReactNode;
};

export const OrderProvider = ({children}: OrderProviderProps) => {
  const {getStorageItem, setStorageItem} = useLocalStorage();

  const getNewOrder = (): OrderType => ({
    id: '12345',
    items: [],
    details: {
      name: '',
      address: '',
      img: '',
      isDelivery: false,
    },
    total: 0,
    confirmed: false,
    paymentType: '',
    status: OrderStatus.pending,
  });

  const getInitialState = () => {
    const order = getStorageItem(STORAGE.orders) as OrderType;

    if (!order) {
      setStorageItem(STORAGE.orders, getNewOrder());
      return getStorageItem(STORAGE.orders) as OrderType;
    }

    return order;
  };

  const [order, setOrder] = useState(getInitialState);

  useEffect(() => {
    if (!order) {
      setOrder(getNewOrder());
    }

    setStorageItem(STORAGE.orders, order);
  }, [order, setStorageItem]);

  const resetOrder = () => {
    setStorageItem(STORAGE.orders, getNewOrder());

    setOrder(getNewOrder());
  };

  return (
    <ORDER_CONTEXT.Provider value={{order, updateOrder: setOrder, resetOrder}}>
      {children}
    </ORDER_CONTEXT.Provider>
  );
};
