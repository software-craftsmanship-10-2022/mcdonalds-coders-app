import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {MOCK_COUPON_ID, MOCK_DISCOUNTS} from '../../operations/mocks/mocks';
import {retrieveCouponFromFakeDDBB} from '../couponsDDBBFunctions';

describe('given an id', () => {
  const {getStorageItem, setStorageItem} = useLocalStorage();
  const UNMATCHED_DISCOUNT_ID = 'foo';

  afterEach(() => {
    localStorage.clear();
  });

  test('when discounts are not defined in localStorage then an error is thrown', () => {
    getStorageItem(STORAGE.discounts);
    expect(() => retrieveCouponFromFakeDDBB(UNMATCHED_DISCOUNT_ID)).toThrowError(Error);
    expect(() => retrieveCouponFromFakeDDBB(UNMATCHED_DISCOUNT_ID)).toThrowError(
      'No discounts available',
    );
  });

  test('when discounts are defined in localStorage and id does not match then an error is thrown', () => {
    setStorageItem(STORAGE.discounts, MOCK_DISCOUNTS);
    expect(() => retrieveCouponFromFakeDDBB(UNMATCHED_DISCOUNT_ID)).toThrowError(Error);
    expect(() => retrieveCouponFromFakeDDBB(UNMATCHED_DISCOUNT_ID)).toThrowError(
      'Item id does not match',
    );
  });

  test('when discounts are defined in localStorage and id matches then coupon should be returned', () => {
    const expectedCoupon = {
      id: '8XUu0dMqsP',
      title: '2 McCombos Cuarto de Libra',
      img: 'PROMOCIONE2McCombosMedianosCuartodeLibraconQueso.png',
      price: 1250,
    };
    setStorageItem(STORAGE.discounts, MOCK_DISCOUNTS);
    const coupon = retrieveCouponFromFakeDDBB(MOCK_COUPON_ID);
    expect(coupon).toBeDefined();
    expect(coupon).toEqual(expectedCoupon);
  });
});
