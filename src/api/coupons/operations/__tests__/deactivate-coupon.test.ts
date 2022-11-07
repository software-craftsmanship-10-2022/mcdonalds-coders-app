import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {getErrorMessage} from '~api/errorHandling/errorHandler';
import type {CouponType} from '~types/coupon';
import * as APIFunctions from '../../shared/functions';
import {default as activateCoupon} from '../activate-coupon';
import deactivateCoupon from '../deactivate-coupon';
import getDiscounts from '../get-discounts';
import {
  MOCK_ACTIVE_COUPON,
  MOCK_ACTIVE_COUPONS,
  MOCK_COUPON_ID,
  MOCK_DISCOUNTS,
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
    jest.spyOn(APIFunctions, 'getDate').mockReturnValueOnce(new Date(MOCK_ACTIVE_COUPON.validDate));
    jest.spyOn(APIFunctions, 'getCode').mockReturnValueOnce(MOCK_ACTIVE_COUPON.code);
    await getDiscounts();
    await activateCoupon(MOCK_COUPON_ID);
    await deactivateCoupon(MOCK_COUPON_ID);
    const {getStorageItem} = useLocalStorage();
    const activeCoupons = getStorageItem(STORAGE.activeCoupons) as CouponType[];
    const inactiveCoupons = getStorageItem(STORAGE.inactiveCoupons) as CouponType[];

    expect(activeCoupons).toEqual([]);
    expect(inactiveCoupons).toEqual(MOCK_ACTIVE_COUPONS);
  });
});
