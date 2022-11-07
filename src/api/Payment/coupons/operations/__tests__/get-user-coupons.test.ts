import * as APIFunctions from '../../shared/functions';
import activateCoupon from '../activate-coupon';
import getDiscounts from '../get-discounts';
import type {UserCoupons} from '../get-user-coupons';
import getUserCoupons from '../get-user-coupons';
import {
  MOCK_ACTIVE_COUPON,
  MOCK_ACTIVE_COUPONS,
  MOCK_COUPON_ID,
  MOCK_DISCOUNTS,
} from '../mocks/mocks';
describe('given an item id and a status', () => {
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

  test('when user has no active coupons return empty array', async () => {
    const userCoupons: UserCoupons = await getUserCoupons();
    expect(userCoupons).toEqual({activeCoupons: [], inactiveCoupons: []});
  });
  test('when user has active coupons returns active coupons in activeCoupons array', async () => {
    jest.spyOn(APIFunctions, 'getDate').mockReturnValueOnce(MOCK_ACTIVE_COUPON.validDate);
    jest.spyOn(APIFunctions, 'getCode').mockReturnValueOnce(MOCK_ACTIVE_COUPON.code);
    await getDiscounts();
    await activateCoupon(MOCK_COUPON_ID);
    const userCoupons: UserCoupons = await getUserCoupons();
    expect(userCoupons).toEqual({activeCoupons: MOCK_ACTIVE_COUPONS, inactiveCoupons: []});
  });
});
