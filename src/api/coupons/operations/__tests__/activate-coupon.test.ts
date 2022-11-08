import type {CouponType} from 'src/@types/coupon';
import {getErrorMessage} from 'src/api/errorHandling/errorHandler';
import {STORAGE} from 'src/config';
import {getFromDDBB} from '../../shared/couponsDDBBFunctions';

import * as CouponUtils from '../../shared/couponUtils';
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
    localStorage.clear();
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
    jest
      .spyOn(CouponUtils, 'getThirtyDaysLaterDate')
      .mockReturnValueOnce(MOCK_ACTIVE_COUPON.validDate);
    jest.spyOn(CouponUtils, 'getCode').mockReturnValueOnce(MOCK_ACTIVE_COUPON.code);

    await getDiscounts();
    const response = await activateCoupon(MOCK_COUPON_ID);

    expect(response).toEqual(MOCK_ACTIVE_COUPON);
  });
  test('when request to activate coupon is successful then an active coupon should be stored in active coupons in local storage', async () => {
    jest
      .spyOn(CouponUtils, 'getThirtyDaysLaterDate')
      .mockReturnValueOnce(MOCK_ACTIVE_COUPON.validDate);
    jest.spyOn(CouponUtils, 'getCode').mockReturnValueOnce(MOCK_ACTIVE_COUPON.code);

    await getDiscounts();
    await activateCoupon(MOCK_COUPON_ID);

    const localCoupons = getFromDDBB(STORAGE.activeCoupons) as CouponType[];

    expect(localCoupons).toEqual(MOCK_ACTIVE_COUPONS);
  });
});
