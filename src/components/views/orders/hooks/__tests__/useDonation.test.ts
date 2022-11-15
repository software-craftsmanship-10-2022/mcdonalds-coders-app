import {act, renderHook} from '@testing-library/react';
import useDonation from '../useDonation';

describe('given useDonation custom hook', () => {
  test('when custom hook is called then expected object should be returned', () => {
    const {result: hookOutput} = renderHook(() => useDonation());

    expect(hookOutput.current.formDonationIsVisible).toBeDefined();
    expect(hookOutput.current.formDonationIsVisible).toBe(false);
    expect(hookOutput.current.donationValue).toBeDefined();
    expect(hookOutput.current.donationValue).toBe(0);
    expect(hookOutput.current.updateDonationFormVisibility).toBeDefined();
    expect(hookOutput.current.updateDonationFormVisibility).toBeInstanceOf(Function);
    expect(hookOutput.current.updateDonationValue).toBeDefined();
    expect(hookOutput.current.updateDonationValue).toBeInstanceOf(Function);
  });

  test('when updateDonationFormVisibility function is called then formDonationIsVisible value should be updated as expected', () => {
    const {result: hookOutput} = renderHook(() => useDonation());

    expect(hookOutput.current.formDonationIsVisible).toBe(false);

    act(() => {
      hookOutput.current.updateDonationFormVisibility(true);
    });
    expect(hookOutput.current.formDonationIsVisible).toBe(true);

    act(() => {
      hookOutput.current.updateDonationFormVisibility(false);
    });
    expect(hookOutput.current.formDonationIsVisible).toBe(false);
  });

  test('when updateDonationValue function is called then donationValue value should be updated as expected', () => {
    const {result: hookOutput} = renderHook(() => useDonation());

    expect(hookOutput.current.donationValue).toBe(0);

    act(() => {
      hookOutput.current.updateDonationValue(1);
    });
    expect(hookOutput.current.donationValue).toEqual(1);

    act(() => {
      hookOutput.current.updateDonationValue(5);
    });
    expect(hookOutput.current.donationValue).toBe(5);

    act(() => {
      hookOutput.current.updateDonationValue(10);
    });
    expect(hookOutput.current.donationValue).toBe(10);

    act(() => {
      hookOutput.current.updateDonationValue(0);
    });
    expect(hookOutput.current.donationValue).toBe(0);
  });
});
