import {useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import type {CouponType} from 'src/@types/coupon';

import {IMG_PATH, STORAGE, URLS} from '../../../config';
import useLocalStorage from '../../../hooks/useLocalStorage';
import CouponModal from '../../modal/CouponModal';
import './ViewCoupon.css';

const ViewCoupon = () => {
  // Coupon data
  const {id} = useParams<{id: string}>();
  const {getStorageItem} = useLocalStorage();
  const activeCoupons = getStorageItem(STORAGE.activeCoupons) as CouponType[];
  const data = activeCoupons.find((coupon) => coupon.id === id);
  if (!data) {
    return <Navigate to={URLS.coupons} replace />;
  }

  // Modal open state
  const [modal, setModal] = useState(false);

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="ViewCoupon">
      <img src={IMG_PATH + data.img} alt="" />
      <p className="warning">🇦🇷 Este cupón solo es válido para la República Argentina.</p>
      <p className="title">{data.title}</p>
      <button className="button" onClick={toggleModal}>
        <img src={IMG_PATH + 'qr-icon.png'} alt="" />
        Utilizar QR
      </button>
      <CouponModal
        modal={modal}
        toggleModal={toggleModal}
        code={data.code}
        title={data.title}
        validDate={data.validDate}
      />
    </div>
  );
};

export default ViewCoupon;
