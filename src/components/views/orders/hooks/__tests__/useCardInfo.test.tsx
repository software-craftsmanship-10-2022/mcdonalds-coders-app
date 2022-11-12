import {act, renderHook} from '@testing-library/react';
import useCardInfo from '../useCardInfo';

describe('given useCardInfo custom hook', () => {
  const EXPECTED_RESULT = {
    cardNumber: '123456789',
    cardDate: '10/22',
    cardCVC: '123',
  };

  test('when custom hook is called then expected object should be returned', () => {
    const {result} = renderHook(() => useCardInfo());

    expect(result.current.cardData).toBeDefined();
    expect(result.current.cardData).toHaveProperty('number', '');
    expect(result.current.cardData).toHaveProperty('date', '');
    expect(result.current.cardData).toHaveProperty('cvc', '');

    expect(result.current.cardUpdate).toBeDefined();
    expect(result.current.cardUpdate).toHaveProperty('number');
    expect(result.current.cardUpdate.number).toBeInstanceOf(Function);
    expect(result.current.cardUpdate).toHaveProperty('date');
    expect(result.current.cardUpdate.number).toBeInstanceOf(Function);
    expect(result.current.cardUpdate).toHaveProperty('cvc');
    expect(result.current.cardUpdate.number).toBeInstanceOf(Function);
  });

  test('when cardUpdate.number is called then state should be updated as expecte', () => {
    const {result} = renderHook(() => useCardInfo());

    expect(result.current.cardData.number).toEqual('');
    act(() => {
      result.current.cardUpdate.number('123456789');
    });
    expect(result.current.cardData.number).toEqual(EXPECTED_RESULT.cardNumber);
  });

  test('when cardUpdate.date is called then state should be updated as expecte', () => {
    const {result} = renderHook(() => useCardInfo());

    expect(result.current.cardData.date).toEqual('');
    act(() => {
      result.current.cardUpdate.date('10/22');
    });
    expect(result.current.cardData.date).toEqual(EXPECTED_RESULT.cardDate);
  });

  test('when cardUpdate.cvc is called then state should be updated as expecte', () => {
    const {result} = renderHook(() => useCardInfo());

    expect(result.current.cardData.cvc).toEqual('');
    act(() => {
      result.current.cardUpdate.cvc('123');
    });
    expect(result.current.cardData.cvc).toEqual(EXPECTED_RESULT.cardCVC);
  });
});
