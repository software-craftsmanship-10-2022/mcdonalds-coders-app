import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import type {CouponType} from 'src/@types/coupon';
import type {DiscountItem} from 'src/@types/discount';

import activateCoupon from '../../../api/coupons/operations/activate-coupon';
import {retrieveCouponFromFakeDDBB} from '../../../api/coupons/shared/couponsDDBBFunctions';
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
  const {category, id} = useParams<{category: string; id: string}>() as {
    category: string;
    id: string;
  };

  useEffect(() => {
    const couponData = retrieveCouponFromFakeDDBB(id);

    setCoupon(couponData);
  }, []);

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddCoupon = async () => {
    const activeCoupon: CouponType = await activateCoupon(id);
    setActiveCoupon(activeCoupon);
    toggleModal();
  };

  if (!category || !id) {
    return <Navigate to={URLS.discounts} replace />;
  }

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
              title={coupon?.title}
              code={activeCoupon.code}
              validDate={activeCoupon.validDate}
            />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AddCoupon;
