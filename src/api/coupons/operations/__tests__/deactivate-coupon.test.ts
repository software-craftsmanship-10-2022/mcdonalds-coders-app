import type {CouponType} from 'src/@types/coupon';
import {getErrorMessage} from 'src/api/errorHandling/errorHandler';
import {STORAGE} from 'src/config';
import {getFromDDBB} from '../../shared/couponsDDBBFunctions';

import * as CouponUtils from '../../shared/couponUtils';
import {default as activateCoupon} from '../activate-coupon';
import deactivateCoupon from '../deactivate-coupon';
import getDiscounts from '../get-discounts';
import {
  MOCK_ACTIVE_COUPONS,
  MOCK_COUPON_CODE,
  MOCK_COUPON_ID,
  MOCK_DISCOUNTS,
  MOCK_VALID_DATE,
} from '../mocks/mocks';
describe('given a deactivateCoupon request', () => {
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
      await deactivateCoupon('');
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      expect(error).toBeInstanceOf(TypeError);
      expect(message).toEqual('Item id is not defined');
    }
  });

  test('when request to deactivate coupon is successful it should delete the coupon from active coupons in local storage and add it to inactive coupons', async () => {
    jest.spyOn(CouponUtils, 'getThirtyDaysLaterDate').mockReturnValueOnce(MOCK_VALID_DATE);
    jest.spyOn(CouponUtils, 'getCode').mockReturnValueOnce(MOCK_COUPON_CODE);

    await getDiscounts();
    await activateCoupon(MOCK_COUPON_ID);
    await deactivateCoupon(MOCK_COUPON_ID);

    const activeCoupons = getFromDDBB(STORAGE.activeCoupons) as CouponType[];
    const inactiveCoupons = getFromDDBB(STORAGE.inactiveCoupons) as CouponType[];

    expect(activeCoupons).toEqual([]);
    expect(inactiveCoupons).toEqual(MOCK_ACTIVE_COUPONS);
  });
});
