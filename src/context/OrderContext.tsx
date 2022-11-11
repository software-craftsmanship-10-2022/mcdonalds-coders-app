import {createContext, useContext, useEffect, useState} from 'react';
import {useOrderStorage} from '../hooks/useOrderStorage';
import type {Order} from '../api/orders/Orders';
import {createEmptyOrder} from '../api/orders/Orders';
import type {OrderContextType} from '../@types/order';

const ORDER_CONTEXT = createContext<OrderContextType>(null as unknown as OrderContextType);

export const useOrderContext = () => useContext(ORDER_CONTEXT)!;

type OrderProviderProps = {
  children?: React.ReactNode;
};

export const OrderProvider = ({children}: OrderProviderProps) => {
  const [order, setOrder] = useState<Order>(createEmptyOrder());
  const storage = useOrderStorage();

  useEffect(() => {
    (async () => {
      const order: Order | undefined = await storage.getOrder();
      order !== undefined && setOrder(order);
    })();
  }, [setOrder]);

  const resetOrder = () => {
    setOrder(createEmptyOrder());
  };

  useEffect(() => {
    (async () => {
      console.log('saving', order);
      await storage.setOrder(order);
    })();
  }, [order]);

  const updateOrder = (order: Order) => {
    setOrder(order.clone());
  };

  return (
    <ORDER_CONTEXT.Provider value={{order, updateOrder, resetOrder}}>
      {children}
    </ORDER_CONTEXT.Provider>
  );
};
