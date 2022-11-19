import {STORAGE} from 'src/config';
import type {NewOrderType} from '../../../@types/order';
import {OrderStatus, PaymentMethod} from '../../../@types/order';
import {updateOrderStatus} from './updateOrderStatus';

describe('[updateOrderStatus]', () => {
  it('should be a function', () => {
    expect(updateOrderStatus).toBeInstanceOf(Function);
  });

  it('should throw an error if the order ID and the status are not passed as parameters', async () => {
    await expect(async () =>
      updateOrderStatus(undefined as unknown as string, undefined as unknown as OrderStatus),
    ).rejects.toThrowError();
  });

  it('should return a promise with no content', () => {
    const orderId = 'some id';
    const status = OrderStatus.preparing;
    const order: NewOrderType = {
      id: orderId,
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
    };

    localStorage.setItem(STORAGE.orders, JSON.stringify(order));

    expect(updateOrderStatus(orderId, status)).toBeInstanceOf(Promise);
  });
});
