/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import type {DiscountItem} from '~types/discount';
import {getErrorMessage} from '../../../errorHandling/errorHandler';
import {getCode, getDate, retrieveCouponFromFakeDDBB} from '../shared/functions';

const formatCouponData = (couponData: DiscountItem) => {
  return {
    id: couponData?.id,
    title: couponData?.title,
    img: couponData?.img,
    price: couponData?.price,
    code: getCode(),
    validDate: getDate(),
  };
};

async function activateCoupon(id: string): Promise<any> {
  if (!id || !id.length) throw new TypeError('Item id is not defined');
  const {setStorageItem, getStorageItem} = useLocalStorage();
  try {
    const couponData = retrieveCouponFromFakeDDBB(id);
    const activeCoupon = couponData && formatCouponData(couponData);
    const activeCoupons = getStorageItem(STORAGE.activeCoupons);
    const updatedCoupons = activeCoupons ? [...activeCoupons, activeCoupon] : [activeCoupon];
    setStorageItem(STORAGE.activeCoupons, updatedCoupons);
    return activeCoupon;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
}

export default activateCoupon;
