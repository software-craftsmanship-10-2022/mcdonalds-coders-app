import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import type {CouponType} from 'src/@types/coupon';
import type {UserCoupons} from 'src/api/coupons/operations/get-user-coupons';
import getUserCoupons from 'src/api/coupons/operations/get-user-coupons';

import {IMG_PATH, URLS} from '../../../config';

import CouponModal from '../../modal/CouponModal';
import './ViewCoupon.css';

const ViewCoupon = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Coupon data
  const {id} = useParams<{id: string}>();
  const [couponData, setCouponData] = useState<CouponType | undefined>(undefined);
  // Modal open state
  const [modal, setModal] = useState(false);

  const handleUserCoupon = async () => {
    await getUserCoupons().then(({activeCoupons}: UserCoupons) => {
      const coupon = activeCoupons.find((coupon) => coupon.id === id);
      setCouponData(coupon);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleUserCoupon().catch((error) => {
      return <Navigate to={URLS.coupons} replace />;
    });
  }, []);

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {isLoading || !couponData ? (
        <div className="ViewCoupon"> Loading ... </div>
      ) : (
        <div className="ViewCoupon">
          <img src={IMG_PATH + couponData.img} alt="" />
          <p className="warning">🇦🇷 Este cupón solo es válido para la República Argentina.</p>
          <p className="title">{couponData.title}</p>
          <button className="button" onClick={toggleModal}>
            <img src={IMG_PATH + 'qr-icon.png'} alt="" />
            Utilizar QR
          </button>
          <CouponModal
            modal={modal}
            toggleModal={toggleModal}
            code={couponData.code}
            title={couponData.title}
            validDate={couponData.validDate}
          />
        </div>
      )}
    </>
  );
};

export default ViewCoupon;
