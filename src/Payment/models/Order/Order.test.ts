import {ORDER_ERRORS} from '../../errorMessages';
import Order from './Order';

describe('Given a Order class', () => {
  it('should contain a amountValue function', () => {
    const order = new Order(44);
    expect(order.totalAmount).toBeInstanceOf(Function);
  });
  it('should throw an error when total amount is negative', () => {
    const order = new Order(-50);
    expect(() => order.totalAmount()).toThrowError(ORDER_ERRORS.over0Number);
  });
  it('should throw an error when total amount is 0', () => {
    const order = new Order(0);
    expect(() => order.totalAmount()).toThrowError(ORDER_ERRORS.over0Number);
  });
});
