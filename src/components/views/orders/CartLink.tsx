import {useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {ORDER_STATES_CODES} from 'src/api/orders/OrderStates/constants';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';

import './CartLink.css';

export const CartLink = () => {
  const {order} = useOrderContext();
  const items = order?.getItems();
  const [showCartLink, setShowCartLink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const HIDDEN_URLS = ['/cart', '/current', '/checkout'];
  useEffect(() => {
    if (HIDDEN_URLS.some((url) => location.pathname.includes(url))) {
      setShowCartLink(false);
      return;
    }

    if (order.getStateCode() === ORDER_STATES_CODES.cancelledByUserState) {
      setShowCartLink(false);
      return;
    }

    if (order && !order.isItemsEmpty()) {
      setShowCartLink(true);
      return;
    }

    setShowCartLink(false);
  }, [order, items, navigate]);
  const getUrl = () => {
    if (order.getStateCode() === ORDER_STATES_CODES.inProgressState) {
      return URLS.ordersCart;
    }

    return URLS.ordersCurrent;
  };

  return (
    <div className="CartLink">
      {showCartLink && (
        <NavLink className="view-order-link" to={getUrl()}>
          <img src={IMG_PATH + 'order-bag.png'} alt="" />
          <div className="order-qty">{order.getItems().length}</div>
        </NavLink>
      )}
    </div>
  );
};
