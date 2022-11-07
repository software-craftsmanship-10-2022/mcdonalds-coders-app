import {useMemo, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import type {CouponType} from '../../../@types/coupon';
import {IMG_PATH, STORAGE, URLS} from '../../../config';
import DISCOUNTS from '../../../data/discounts';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useRandom from '../../../hooks/useRandom';
import CouponModal from '../../modal/CouponModal';
import './AddCoupon.css';

const AddCoupon = () => {
  // Coupon couponData
  const {category, id} = useParams<{category?: string; id?: string}>();
  const couponData = DISCOUNTS.find((discountCategory) => discountCategory.id === category)?.items[
    Number(id)
  ];

  const {getStorageItem, setStorageItem} = useLocalStorage();
  let coupons = getStorageItem(STORAGE.coupons) as CouponType[];

  // Get date 30 days from now
  const date = new Date();
  date.setDate(date.getDate() + 30);

  // Modal open state
  const [modal, setModal] = useState(false);
  const [added, setAdded] = useState(false);
  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  const randomString = useRandom(9);
  const code = useMemo(
    () => randomString.match(/.{1,3}/g)!.join('-'),

    [randomString],
  );

  if (!couponData) {
    return <Navigate to={URLS.discounts} replace />;
  }

  const handleAddCoupon = () => {
    if (!added) {
      const coupon = {
        title: couponData?.title,
        img: couponData?.img,
        price: couponData?.price,
        code,
        validDate: date,
      };

      if (!coupons) {
        coupons = [];
      }

      coupons.push(coupon);
      // @TODO refacto localstorage
      setStorageItem(STORAGE.coupons, coupons as unknown as Record<string, unknown>);
      setAdded(true);
    }

    toggleModal();
  };

  return (
    <div className="AddCoupon">
      <img src={IMG_PATH + couponData.img} alt="" />
      <p className="warning">🇦🇷 Este cupón solo es válido para la República Argentina.</p>
      <p className="title">{couponData?.title}</p>
      <button className="button" onClick={handleAddCoupon}>
        <img src={IMG_PATH + 'qr-icon.png'} alt="" />
        OBTENER CUPÓN
      </button>
      <CouponModal
        modal={modal}
        toggleModal={toggleModal}
        title={couponData?.title}
        code={code}
        validDate={date}
      />
    </div>
  );
};

export default AddCoupon;
