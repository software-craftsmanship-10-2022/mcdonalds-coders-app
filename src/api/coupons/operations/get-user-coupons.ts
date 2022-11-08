import type {CouponType} from 'src/@types/coupon';
import {STORAGE} from 'src/config';
import {getFromDDBB} from '../shared/couponsDDBBFunctions';
import deactivateCoupon from './deactivate-coupon';

export type UserCoupons = {
  activeCoupons: CouponType[];
  inactiveCoupons: CouponType[];
};

const checkExpired = async (
  activeCoupons: CouponType[],
  inactiveCoupons: CouponType[],
): Promise<UserCoupons> => {
  const date = new Date();
  let updatedActiveCoupons = activeCoupons || [];
  let updatedInactiveCoupons = inactiveCoupons || [];

  for (const coupon of activeCoupons) {
    if (new Date(coupon.validDate) < date) {
      // @TODO: fix async inside loop

      // eslint-disable-next-line no-await-in-loop
      await deactivateCoupon(coupon.id);
      updatedActiveCoupons = getFromDDBB(STORAGE.activeCoupons) as CouponType[];
      updatedInactiveCoupons = getFromDDBB(STORAGE.inactiveCoupons) as CouponType[];
    }
  }

  const response = {
    activeCoupons: updatedActiveCoupons,
    inactiveCoupons: updatedInactiveCoupons,
  };
  return response;
};

async function getUserCoupons(): Promise<UserCoupons> {
  const activeCoupons = getFromDDBB(STORAGE.activeCoupons) as CouponType[];
  const inactiveCoupons = getFromDDBB(STORAGE.inactiveCoupons) as CouponType[];
  const response: UserCoupons = activeCoupons
    ? await checkExpired(activeCoupons, inactiveCoupons)
    : {
        activeCoupons: [],
        inactiveCoupons: inactiveCoupons || [],
      };
  return response;
}

export default getUserCoupons;
