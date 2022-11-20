import type {OrderAddressDetailsType} from 'src/@types/order';
import {PaymentMethod} from 'src/@types/order';
import Order from './Order';

/**
 * Create a new empty order.
 *
 * @return new order.
 */
export default function createEmptyOrder(): Order {
  const details: OrderAddressDetailsType = {
    id: '',
    name: '',
    address: '',
    image: '',
    isDelivery: false,
  };

  return new Order({
    details,
    id: '123',
    items: [],
    total: 0,
    payment: PaymentMethod.cash,
  });
}
