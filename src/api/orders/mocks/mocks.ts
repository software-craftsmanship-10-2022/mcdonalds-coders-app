import {OrderStatus, PaymentMethod} from 'src/@types/order';
import Order from '../Order';

export const MOCK_NEW_ORDER = new Order({
  id: '1a',
  details: {
    id: '2a',
    name: 'user 1',
    address: '123 Fake street',
    image: 'avatar',
    isDelivery: false,
  },
  items: [],
  payment: PaymentMethod.cash,
  status: OrderStatus.noConfirmed,
});
