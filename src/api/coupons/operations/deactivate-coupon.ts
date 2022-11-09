/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {CouponType} from 'src/@types/coupon';
import {STORAGE} from 'src/config';
import {getFromDDBB, saveInDDBB} from '../shared/couponsDDBBFunctions';

async function deactivateCoupon(id: string): Promise<void> {
  if (!id || !id.length) throw new TypeError('Item id is not defined');

  const activeCoupons: CouponType[] = getFromDDBB(STORAGE.activeCoupons);
  const inactiveCoupons: CouponType[] = getFromDDBB(STORAGE.inactiveCoupons);
  const selectedCoupon: CouponType = activeCoupons.find((coupon: CouponType) => coupon.id === id)!;
  const updatedActiveCoupons = activeCoupons.filter((coupon: CouponType) => coupon.id !== id);
  const updatedInactiveCoupons = inactiveCoupons
    ? [...inactiveCoupons, selectedCoupon]
    : [selectedCoupon];
  saveInDDBB(STORAGE.activeCoupons, updatedActiveCoupons);
  saveInDDBB(STORAGE.inactiveCoupons, updatedInactiveCoupons);
}

export default deactivateCoupon;
