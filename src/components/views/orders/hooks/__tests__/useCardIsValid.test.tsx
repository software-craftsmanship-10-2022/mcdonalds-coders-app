import {renderHook} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import useIsCardValid from '../useIsCardValid';

describe('given useIsCardValid custom hook', () => {
  test('when custom hook is called then expected object should be returned', () => {
    const {result} = renderHook(() => useIsCardValid());

    expect(result.current.isCardValid).toBeDefined();
    expect(result.current.isCardValid).toBe(false);
    expect(result.current.updateCardValidity).toBeDefined();
    expect(result.current.updateCardValidity).toBeInstanceOf(Function);
  });

  test('when updateCardValidity is called then state should be updated as expected', () => {
    const {result} = renderHook(() => useIsCardValid());

    expect(result.current.isCardValid).toBe(false);

    act(() => {
      result.current.updateCardValidity(true);
    });
    expect(result.current.isCardValid).toBe(true);

    act(() => {
      result.current.updateCardValidity(false);
    });
    expect(result.current.isCardValid).toBe(false);
  });
});
