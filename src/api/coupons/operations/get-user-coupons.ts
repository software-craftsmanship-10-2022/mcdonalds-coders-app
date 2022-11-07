import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import type {CouponType} from '~types/coupon';

export type UserCoupons = {
  activeCoupons: CouponType[];
  inactiveCoupons: CouponType[];
};
async function getUserCoupons(): Promise<UserCoupons> {
  const {getStorageItem} = useLocalStorage();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const activeCoupons: CouponType[] = getStorageItem(STORAGE.activeCoupons);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const inactiveCoupons: CouponType[] = getStorageItem('inactiveCoupons');
  return {activeCoupons: activeCoupons || [], inactiveCoupons: inactiveCoupons || []};
}

export default getUserCoupons;
