import type {CouponType} from 'src/@types/coupon';
import {STORAGE} from 'src/config';
import {getFromDDBB} from '../shared/couponsDDBBFunctions';

export type UserCoupons = {
  activeCoupons: CouponType[];
  inactiveCoupons: CouponType[];
};
async function getUserCoupons(): Promise<UserCoupons> {
  const activeCoupons = getFromDDBB(STORAGE.activeCoupons) as CouponType[];
  const inactiveCoupons = getFromDDBB('inactiveCoupons') as CouponType[];
  return {activeCoupons: activeCoupons || [], inactiveCoupons: inactiveCoupons || []};
}

export default getUserCoupons;
