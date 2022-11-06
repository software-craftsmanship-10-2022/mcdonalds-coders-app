import type {CouponType} from '../../../@types/coupon';

type CouponRequestType = Pick<CouponType, 'title' | 'img' | 'price'>;

export type GenericPromiseType = {
  json(): Promise<any>;
};

export type DiscountType = {
  category: string;
  id: string;
  items: CouponRequestType[];
};

function getDiscounts(): Promise<any> {
  return fetch('src/data/discounts')
    .then((response) => response.json())
    .then((discounts) => discounts)
    .catch((error: any) => {
      return {
        error: {
          name: error.name,
          message: error.message,
        },
        discounts: [],
      };
    });
}
export default getDiscounts;
