import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {getErrorMessage} from '~api/errorHandling/errorHandler';
import type {CouponType} from '~types/coupon';
import * as APIFunctions from '../../shared/functions';
import {default as activateCoupon} from '../activate-coupon';
import getDiscounts from '../get-discounts';
import {
  MOCK_ACTIVE_COUPON,
  MOCK_ACTIVE_COUPONS,
  MOCK_COUPON_ID,
  MOCK_DISCOUNTS,
} from '../mocks/mocks';

describe('given a activateCoupon request', () => {
  globalThis.fetch = jest.fn(async () => {
    return Promise.resolve({
      json: () => MOCK_DISCOUNTS,
      ok: true,
      status: 200,
    });
  }) as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('when id is not defined then an TypeError is thrown', async () => {
    try {
      await activateCoupon('');
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      expect(error).toBeInstanceOf(TypeError);
      expect(message).toEqual('Item id is not defined');
    }
  });
  test('when id is not in discounts then an Error is thrown', async () => {
    await getDiscounts();

    try {
      await activateCoupon('asdf');
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      expect(error).toBeInstanceOf(Error);
      expect(message).toEqual('Item id does not match');
    }
  });
  test('when request to activate coupon is resolved then an active coupon should be returned', async () => {
    await getDiscounts();

    jest.spyOn(APIFunctions, 'getDate').mockReturnValueOnce(MOCK_ACTIVE_COUPON.validDate);
    jest.spyOn(APIFunctions, 'getCode').mockReturnValueOnce(MOCK_ACTIVE_COUPON.code);

    const response = (await activateCoupon(MOCK_COUPON_ID)) as CouponType;

    expect(response).toEqual(MOCK_ACTIVE_COUPON);
  });
  test('when request to activate coupon is successful then an active coupon should be stored in active coupons in local storage', async () => {
    const {getStorageItem} = useLocalStorage();
    const localCoupons = getStorageItem(STORAGE.activeCoupons) as CouponType[];

    expect(localCoupons).toEqual(MOCK_ACTIVE_COUPONS);
  });
});
