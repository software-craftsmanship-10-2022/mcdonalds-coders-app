/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {CouponType} from 'src/@types/coupon';
import type {DiscountItem} from 'src/@types/discount';
import {STORAGE} from 'src/config';
import {getErrorMessage} from '../../errorHandling/errorHandler';
import {getFromDDBB, retrieveCouponFromFakeDDBB, saveInDDBB} from '../shared/couponsDDBBFunctions';
import {getCode, getThirtyDaysLaterDate} from '../shared/couponUtils';

const formatCouponData = (couponData: DiscountItem) => {
  return {
    id: couponData?.id,
    title: couponData?.title,
    img: couponData?.img,
    price: couponData?.price,
    code: getCode(),
    validDate: getThirtyDaysLaterDate(),
  };
};

async function activateCoupon(id: string): Promise<CouponType> {
  if (!id || !id.length) throw new TypeError('Item id is not defined');
  try {
    const couponData = retrieveCouponFromFakeDDBB(id)!;
    const activeCoupon: CouponType = formatCouponData(couponData);
    const activeCoupons = getFromDDBB(STORAGE.activeCoupons);
    const updatedCoupons = activeCoupons ? [...activeCoupons, activeCoupon] : [activeCoupon];
    saveInDDBB(STORAGE.activeCoupons, updatedCoupons);
    return activeCoupon;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
}

export default activateCoupon;
