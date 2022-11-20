import {createContext, useContext, useEffect, useState} from 'react';
import createEmptyOrder from 'src/api/orders/createEmptyOrder';
import type {OrderContextType} from '../@types/order';
import type Order from '../api/orders/Order';
import {useOrderStorage} from '../hooks/useOrderStorage';

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
  }, []);
  useEffect(() => {
    console.log(order.getStateCode());
  }, [order]);

  const resetOrder = async () => {
    await updateOrder(createEmptyOrder());
  };

  const updateOrder = async (order: Order) => {
    setOrder(order);
    await storage.setOrder(order);
  };

  return (
    <ORDER_CONTEXT.Provider value={{order, updateOrder, resetOrder}}>
      {children}
    </ORDER_CONTEXT.Provider>
  );
};
