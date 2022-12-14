import * as CouponUtils from '../../shared/couponUtils';
import activateCoupon from '../activate-coupon';
import getDiscounts from '../get-discounts';
import type {UserCoupons} from '../get-user-coupons';
import getUserCoupons from '../get-user-coupons';
import {
  MOCK_ACTIVE_COUPONS,
  MOCK_COUPON_CODE,
  MOCK_COUPON_ID,
  MOCK_DISCOUNTS,
  MOCK_EXPIRED_DATE,
  MOCK_INACTIVE_COUPONS,
  MOCK_VALID_DATE,
} from '../mocks/mocks';

describe('given a getUserCoupons request', () => {
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

  test('when user has no active coupons return empty array', async () => {
    const userCoupons: UserCoupons = await getUserCoupons();

    expect(userCoupons).toEqual({activeCoupons: [], inactiveCoupons: []});
  });

  test('when user has active coupons returns active coupons in activeCoupons array', async () => {
    jest.spyOn(CouponUtils, 'getThirtyDaysLaterDate').mockReturnValueOnce(MOCK_VALID_DATE);
    jest.spyOn(CouponUtils, 'getCode').mockReturnValueOnce(MOCK_COUPON_CODE);
    await getDiscounts();
    await activateCoupon(MOCK_COUPON_ID);
    const userCoupons: UserCoupons = await getUserCoupons();

    expect(userCoupons).toEqual({activeCoupons: MOCK_ACTIVE_COUPONS, inactiveCoupons: []});
  });

  test('when getting user coupons, if activeCoupon is expired, move it into inactiveCoupons', async () => {
    jest.spyOn(CouponUtils, 'getThirtyDaysLaterDate').mockReturnValueOnce(MOCK_EXPIRED_DATE);
    jest.spyOn(CouponUtils, 'getCode').mockReturnValueOnce(MOCK_COUPON_CODE);
    await getDiscounts();
    await activateCoupon(MOCK_COUPON_ID);
    const userCoupons: UserCoupons = await getUserCoupons();

    expect(userCoupons).toEqual({activeCoupons: [], inactiveCoupons: MOCK_INACTIVE_COUPONS});
  });
});
