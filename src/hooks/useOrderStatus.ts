import type {OrderStatus} from 'src/@types/order.d';
import {updateOrderStatus} from 'src/api/orders/application/updateOrderStatus';

const useOrderStatus = () => {
  const setOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    await updateOrderStatus(orderId, status);
  };

  return {setOrderStatus};
};

export default useOrderStatus;
