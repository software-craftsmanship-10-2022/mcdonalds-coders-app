import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import type {CouponType} from '../../../@types/coupon';
import deactivateCoupon from '../../../api/coupons/operations/deactivate-coupon';
import {IMG_PATH, LOCALE, STORAGE, URLS} from '../../../config';
import useFormat from '../../../hooks/useFormat';
import useLocalStorage from '../../../hooks/useLocalStorage';
import './Coupon.css';

// Local types
type CouponAndIndexType = CouponType & {
  parentIndex: number;
};

const Coupon = () => {
  const [nothingToDisplay, setNothingToDisplay] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  const [activeCoupons, setActiveCoupons] = useState<CouponType[]>([]);
  const [inactiveCoupons, setInactiveCoupons] = useState<CouponType[]>([]);
  const [currencyFormatter] = useFormat();
  const date = new Date();

  useEffect(() => {
    const {getStorageItem} = useLocalStorage();
    const activeCoupons: CouponType[] = getStorageItem(STORAGE.activeCoupons) as CouponType[];
    const inactiveCoupons: CouponType[] = getStorageItem(STORAGE.inactiveCoupons) as CouponType[];

    activeCoupons && setActiveCoupons(activeCoupons);
    inactiveCoupons && setInactiveCoupons(inactiveCoupons);
  }, []);

  const handleInactiveCoupon = async (coupon: CouponType) => {
    await deactivateCoupon(coupon.id);
  };

  useEffect(() => {
    activeCoupons.forEach((coupon) => {
      if (new Date(coupon.validDate) < date) {
        handleInactiveCoupon(coupon).catch((e) => {
          console.log(e);
        });
      }
    });
  }, [activeCoupons]);

  useEffect(() => {
    // Display default view when there is no coupons to
    // display in the current selected section
    if (active) {
      setNothingToDisplay(activeCoupons.length <= 0);
    } else {
      setNothingToDisplay(inactiveCoupons.length <= 0);
    }
  }, [active, activeCoupons.length, inactiveCoupons.length]);

  const DefaultView = () => (
    <div className="default-view">
      <img src={IMG_PATH + 'logo-plain.png'} alt="" />
      <h2>
        <strong>No existen cupones para mostrar</strong>
      </h2>
    </div>
  );

  type CouponCardProps = {
    validDate: Date;
    img: string;
    price: number;
    id: string;
    disabled?: boolean;
  };

  const CouponCard = ({validDate, disabled, img, price, id}: CouponCardProps) => (
    <Link className="coupon-card" to={disabled ? ' ' : `${URLS.coupons}${id}`}>
      <img src={IMG_PATH + img} alt="" />
      <div className="info">
        <span className="date">{'Vence el ' + new Date(validDate).toLocaleDateString(LOCALE)}</span>
        <span className="price">{currencyFormatter().format(price)}</span>
      </div>
    </Link>
  );

  return (
    <div className="Coupon">
      <div className="mode-button-container">
        <button
          type="button"
          className={active ? 'mode-button selected' : 'mode-button'}
          onClick={() => {
            setActive(true);
          }}
        >
          Activos
        </button>
        <button
          type="button"
          className={active ? 'mode-button' : 'mode-button selected'}
          onClick={() => {
            setActive(false);
          }}
        >
          Inactivos
        </button>
      </div>
      {nothingToDisplay && <DefaultView />}
      {!nothingToDisplay &&
        active &&
        activeCoupons.map((element, index) => (
          <CouponCard
            key={index}
            validDate={element.validDate}
            img={element.img}
            id={element.id}
            price={element.price}
          />
        ))}
      {!nothingToDisplay &&
        !active &&
        inactiveCoupons.map((element, index) => (
          <CouponCard
            disabled={true}
            key={index}
            validDate={element.validDate}
            img={element.img}
            id={element.id}
            price={element.price}
          />
        ))}
    </div>
  );
};

export default Coupon;
