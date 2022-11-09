import {OrderStatus} from 'src/@types/order.d';

export type OrderRepository = {
  save: (orderId: string, status: OrderStatus) => Promise<void>;
};
