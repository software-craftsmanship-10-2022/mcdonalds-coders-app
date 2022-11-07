import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import type {CouponType} from '~types/coupon';

export type UserCoupons = {
  activeCoupons: CouponType[];
  inactiveCoupons: CouponType[];
};
async function getUserCoupons(): Promise<UserCoupons> {
  const {getStorageItem} = useLocalStorage();
  const activeCoupons = getStorageItem(STORAGE.activeCoupons) as CouponType[];
  const inactiveCoupons = getStorageItem('inactiveCoupons') as CouponType[];
  return {activeCoupons: activeCoupons || [], inactiveCoupons: inactiveCoupons || []};
}

export default getUserCoupons;
