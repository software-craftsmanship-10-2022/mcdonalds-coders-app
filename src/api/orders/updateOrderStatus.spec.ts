import {OrderStatus} from '../../@types/order.d';
import {updateOrderStatus} from './updateOrderStatus';

/**
 * updateOrderStatus should:
 * - be a function
 * - have the order ID and the status to be changed as parameters
 * - the ID should be a string
 * - the status should be of enum type OrderStatus
 * - should return a promise with no content
 * - should update the order status
 * - should throw an error if no order is created
 */

describe('[updateOrderStatus]', () => {
  it('should be a function', () => {
    expect(updateOrderStatus).toBeInstanceOf(Function);
  });

  it('should throw an error if the order ID and the status are not passed as parameters', () => {
    expect(() =>
      updateOrderStatus(undefined as unknown as string, undefined as unknown as OrderStatus),
    ).toThrowError();
  });

  it('should return a promise with no content', () => {
    const orderId = 'some id',
      status = OrderStatus.preparing;

    expect(updateOrderStatus(orderId, status)).toBeInstanceOf(Promise);
  });
});
