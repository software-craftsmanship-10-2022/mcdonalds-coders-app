/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import type {CouponType} from '~types/coupon';
import activateCoupon from '../../../api/coupons/operations/activate-coupon';
import {retrieveCouponFromFakeDDBB} from '../../../api/coupons/shared/functions';
import {IMG_PATH, URLS} from '../../../config';
import CouponModal from '../../modal/CouponModal';
import './AddCoupon.css';

const AddCoupon = () => {
  // Coupon couponData
  const {category, id} = useParams<{category: string; id: string}>();
  if (!category || !id) {
    return <Navigate to={URLS.discounts} replace />;
  }

  const couponData = retrieveCouponFromFakeDDBB(id);
  // Modal open state
  const [modal, setModal] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<CouponType | undefined>(undefined);
  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  if (!couponData) {
    return <Navigate to={URLS.discounts} replace />;
  }

  const handleAddCoupon = async () => {
    const activeCoupon = await activateCoupon(id);
    setActiveCoupon(activeCoupon);
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
  );
};

export default AddCoupon;
