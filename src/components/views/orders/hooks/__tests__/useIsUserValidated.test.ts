import {act, renderHook} from '@testing-library/react';
import useIsUserValidated from '../useIsUserValidated';

describe('given useIsUserValidated custom hook', () => {
  test('when custom hook is called then expected object should be returned', () => {
    const {result: hookOutput} = renderHook(() => useIsUserValidated());

    expect(hookOutput.current.isUserValidated).toBe(false);
    expect(hookOutput.current.updateUserValidatedStatus).toBeDefined();
    expect(hookOutput.current.updateUserValidatedStatus).toBeInstanceOf(Function);
  });

  test('when updateUserValidatedStatus function is called then state should be updated as expecte', () => {
    const {result: hookOutput} = renderHook(() => useIsUserValidated());

    act(() => {
      hookOutput.current.updateUserValidatedStatus(true);
    });
    expect(hookOutput.current.isUserValidated).toBe(true);

    act(() => {
      hookOutput.current.updateUserValidatedStatus(false);
    });
    expect(hookOutput.current.isUserValidated).toBe(false);
  });
});
