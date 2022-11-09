import {OrderStatus} from '../../../@types/order.d';
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

    expect(updateOrderStatus(orderId, status)).toBeInstanceOf(Promise);
  });
});
