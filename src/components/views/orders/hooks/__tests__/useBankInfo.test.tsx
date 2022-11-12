import {act, renderHook} from '@testing-library/react';
import useBankInfo from '../useBankInfo';

describe('given useBankInfo custom hook', () => {
  const EXPECTED_RESULT = {
    fullName: 'John Doe',
    iban: 'ES7921000813610123456789',
  };

  test('when custom hook is called then expected object should be returned', () => {
    const {result} = renderHook(() => useBankInfo());

    expect(result.current.bankData).toBeDefined();
    expect(result.current.bankData).toHaveProperty('fullName', '');
    expect(result.current.bankData).toHaveProperty('iban', '');

    expect(result.current.bankUpdate).toBeDefined();
    expect(result.current.bankUpdate).toHaveProperty('fullName');
    expect(result.current.bankUpdate.fullName).toBeInstanceOf(Function);
    expect(result.current.bankUpdate).toHaveProperty('iban');
    expect(result.current.bankUpdate.iban).toBeInstanceOf(Function);
  });

  test('when cardUpdate.number is called then state should be updated as expecte', () => {
    const {result} = renderHook(() => useBankInfo());

    expect(result.current.bankData.fullName).toEqual('');
    act(() => {
      result.current.bankUpdate.fullName('John Doe');
    });
    expect(result.current.bankData.fullName).toEqual(EXPECTED_RESULT.fullName);
  });

  test('when cardUpdate.date is called then state should be updated as expecte', () => {
    const {result} = renderHook(() => useBankInfo());

    expect(result.current.bankData.iban).toEqual('');
    act(() => {
      result.current.bankUpdate.iban('ES7921000813610123456789');
    });
    expect(result.current.bankData.iban).toEqual(EXPECTED_RESULT.iban);
  });
});
