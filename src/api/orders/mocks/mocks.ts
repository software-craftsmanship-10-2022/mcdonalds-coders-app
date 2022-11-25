import {PaymentAmount} from 'src/Payment/models/PaymentAmount/PaymentAmount';
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
    payment: {id: '1', text: 'Cash'},
    paymentAmount: new PaymentAmount(100, 0, undefined),
  });
