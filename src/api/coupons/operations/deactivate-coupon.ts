/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import type {CouponType} from '~types/coupon';

async function deactivateCoupon(id: string): Promise<void> {
  if (!id || !id.length) throw new TypeError('Item id is not defined');

  const {setStorageItem, getStorageItem} = useLocalStorage();
  const activeCoupons: CouponType[] = getStorageItem(STORAGE.activeCoupons);
  const inactiveCoupons: CouponType[] = getStorageItem(STORAGE.inactiveCoupons);
  const selectedCoupon = activeCoupons.find((coupon: CouponType) => coupon.id === id);
  const updatedActiveCoupons = activeCoupons.filter((coupon: CouponType) => coupon.id !== id);
  const updatedInactiveCoupons = inactiveCoupons
    ? [...inactiveCoupons, selectedCoupon]
    : [selectedCoupon];
  setStorageItem(STORAGE.activeCoupons, updatedActiveCoupons);
  setStorageItem(STORAGE.inactiveCoupons, updatedInactiveCoupons);
}

export default deactivateCoupon;
