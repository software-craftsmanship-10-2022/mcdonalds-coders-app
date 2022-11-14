import {ORDER_ERRORS} from '../../errorMessages';
import Order from './Order';

describe('Given a Order class', () => {
  it('should contain a amountValue function', () => {
    const order = new Order(44);
    expect(order.totalAmount).toBeInstanceOf(Function);
  });
  it('when amount is not setted then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const order = new Order(undefined);
    expect(() => order.totalAmount()).toThrowError(ORDER_ERRORS.noOrderAmount);
  });
  it('when amount is not a number then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const order = new Order('aaa');
    expect(() => order.totalAmount()).toThrowError(ORDER_ERRORS.amountAsNumber);
  });
  it('when total amount is negative then an error should be thrown', () => {
    const order = new Order(-50);
    expect(() => order.totalAmount()).toThrowError(ORDER_ERRORS.over0Number);
  });
  it('when total amount is 0 then an error should be thrown', () => {
    const order = new Order(0);
    expect(() => order.totalAmount()).toThrowError(ORDER_ERRORS.over0Number);
  });
});
