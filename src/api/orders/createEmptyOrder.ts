import type {NewOrderAddressDetailsType} from 'src/@types/order';
import {PaymentMethod} from 'src/@types/order';
import Order from './Order';

/**
 * Create a new empty order.
 *
 * @return new order.
 */
export default function createEmptyOrder(): Order {
  const details: NewOrderAddressDetailsType = {
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
    payment: PaymentMethod.cash,
  });
}
