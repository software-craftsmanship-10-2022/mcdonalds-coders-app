import {act, renderHook} from '@testing-library/react';
import usePaymentWarningModal from '../usePaymentWarningModal';

describe('given usePaymentWarningModal custom hook', () => {
  test('when custom hook is called then expected object should be returned', () => {
    const {result: hookOutput} = renderHook(() => usePaymentWarningModal());

    expect(hookOutput.current.modalWarningMessage).toBeDefined();
    expect(hookOutput.current.modalWarningMessage).toBe('');
    expect(hookOutput.current.warningModalIsVisible).toBeDefined();
    expect(hookOutput.current.warningModalIsVisible).toBe(false);
    expect(hookOutput.current.updateModalWarningMessage).toBeDefined();
    expect(hookOutput.current.updateModalWarningMessage).toBeInstanceOf(Function);
    expect(hookOutput.current.toggleWarningModalVisibility).toBeDefined();
    expect(hookOutput.current.toggleWarningModalVisibility).toBeInstanceOf(Function);
  });

  test('when updateModalWarningMessage function is called then modalWarningMessage should be updated as expected', () => {
    const {result: hookOutput} = renderHook(() => usePaymentWarningModal());

    expect(hookOutput.current.modalWarningMessage).toBe('');

    act(() => {
      hookOutput.current.updateModalWarningMessage('foo');
    });
    expect(hookOutput.current.modalWarningMessage).toBe('foo');
  });

  test('when toggleWarningModalVisibility function is called then warningModalIsVisible should be updated as expected', () => {
    const {result: hookOutput} = renderHook(() => usePaymentWarningModal());

    expect(hookOutput.current.warningModalIsVisible).toBe(false);

    act(() => {
      hookOutput.current.toggleWarningModalVisibility();
    });
    expect(hookOutput.current.warningModalIsVisible).toBe(true);

    act(() => {
      hookOutput.current.toggleWarningModalVisibility();
    });
    expect(hookOutput.current.warningModalIsVisible).toBe(false);
  });
});
