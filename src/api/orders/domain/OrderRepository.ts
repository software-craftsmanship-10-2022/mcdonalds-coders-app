import type {OrderStatus} from 'src/@types/order';

export type OrderRepository = {
  save: (orderId: string, status: OrderStatus) => Promise<void>;
};
