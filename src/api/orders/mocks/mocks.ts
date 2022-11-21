import {PaymentMethod} from 'src/@types/order';
import Order from '../Order';

export const mockNewOrder = () =>
  new Order({
    id: '1a',
    details: {
      id: '2a',
      name: 'user 1',
      address: '123 Fake street',
      image: 'avatar',
      isDelivery: false,
    },
    items: [],
    total: 0,
    payment: PaymentMethod.cash,
  });