/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import type {CouponType} from '~types/coupon';
import type {DiscountItem} from '~types/discount';
import activateCoupon from '../../../api/coupons/operations/activate-coupon';
import {retrieveCouponFromFakeDDBB} from '../../../api/coupons/shared/functions';
import {IMG_PATH, URLS} from '../../../config';
import CouponModal from '../../modal/CouponModal';
import './AddCoupon.css';

const AddCoupon = () => {
  // Modal open state
  const [modal, setModal] = useState(false);
  // Coupon state
  const [activeCoupon, setActiveCoupon] = useState<CouponType | undefined>(undefined);
  const [coupon, setCoupon] = useState<DiscountItem | undefined>(undefined);
  // Coupon couponData
  const {category, id} = useParams<{category: string; id: string}>();
  if (!category || !id) {
    return <Navigate to={URLS.discounts} replace />;
  }

  useEffect(() => {
    const couponData = retrieveCouponFromFakeDDBB(id);
    if (!couponData) {
      <Navigate to={URLS.discounts} replace />;
    }

    setCoupon(couponData);
  }, []);

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddCoupon = async () => {
    const activeCoupon = await activateCoupon(id);
    setActiveCoupon(activeCoupon);
    toggleModal();
  };

  return (
    <>
      {coupon ? (
        <div className="AddCoupon">
          <img src={IMG_PATH + coupon.img} alt="" />
          <p className="warning">🇦🇷 Este cupón solo es válido para la República Argentina.</p>
          <p className="title">{coupon?.title}</p>
          <button className="button" onClick={handleAddCoupon}>
            <img src={IMG_PATH + 'qr-icon.png'} alt="" />
            OBTENER CUPÓN
          </button>
          {activeCoupon && (
            <CouponModal
              modal={modal}
              toggleModal={toggleModal}
              title={activeCoupon?.title}
              code={activeCoupon?.code}
              validDate={activeCoupon?.validDate}
            />
          )}
        </div>
      ) : (
        // TODO: loader
        <div className="AddCoupon">Loading ...</div>
      )}
    </>
  );
};

export default AddCoupon;
