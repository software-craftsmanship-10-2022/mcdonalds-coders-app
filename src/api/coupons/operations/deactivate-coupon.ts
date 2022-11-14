import type {CouponType} from 'src/@types/coupon';
import {STORAGE} from 'src/config';
import {getFromDDBB, saveInDDBB} from '../shared/couponsDDBBFunctions';

async function deactivateCoupon(id: string): Promise<void> {
  if (!id || !id.length) throw new TypeError('Item id is not defined');

  const activeCoupons = getFromDDBB<CouponType[]>(STORAGE.activeCoupons);
  const inactiveCoupons = getFromDDBB<CouponType[]>(STORAGE.inactiveCoupons);
  if (!activeCoupons) {
    throw new Error('No active items');
  }

  const selectedCoupon: CouponType | undefined = activeCoupons.find(
    (coupon: CouponType) => coupon.id === id,
  );
  if (!selectedCoupon) {
    throw new Error('Item is not active');
  }

  const updatedActiveCoupons = activeCoupons.filter((coupon: CouponType) => coupon.id !== id);
  const updatedInactiveCoupons = inactiveCoupons
    ? [...inactiveCoupons, selectedCoupon]
    : [selectedCoupon];
  saveInDDBB<CouponType[]>(STORAGE.activeCoupons, updatedActiveCoupons);
  saveInDDBB<CouponType[]>(STORAGE.inactiveCoupons, updatedInactiveCoupons);
}

export default deactivateCoupon;
