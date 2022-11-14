import {act, renderHook} from '@testing-library/react';
import usePaymentMethod from '../usePaymentMethod';

describe('given usePaymentMethod custom hook', () => {
  test('when custom hook is called then expected object should be returned', () => {
    const {result: hookOutput} = renderHook(() => usePaymentMethod('foo'));

    expect(hookOutput.current.paymentMethod).toBeDefined();
    expect(hookOutput.current.paymentMethod).toBe('foo');
    expect(hookOutput.current.updatePaymentMethod).toBeDefined();
    expect(hookOutput.current.updatePaymentMethod).toBeInstanceOf(Function);
  });

  test('when updatePaymentMethod function is called then paymentMethod should be updated as expected', () => {
    const {result: hookOutput} = renderHook(() => usePaymentMethod('bar'));

    expect(hookOutput.current.paymentMethod).toBe('bar');

    act(() => {
      hookOutput.current.updatePaymentMethod('buzz');
    });
    expect(hookOutput.current.paymentMethod).toBe('buzz');
  });
});
