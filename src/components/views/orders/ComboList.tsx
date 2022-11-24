import {NavLink} from 'react-router-dom';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import COMBOS from '../../../data/combos';
import Slider from '../../slider/Slider';
import './ComboList.css';

const ComboList = () => {
  const {order} = useOrderContext();
  const details = order.getDetails();

  return (
    <div className="ComboList">
      <div className="restaurant">
        <img src={IMG_PATH + details.image} alt="" />
        <div className="address">
          <p>{details.name}</p>
          <p>{details.address}</p>
        </div>
      </div>
      <div className="ComboList-slides">
        {COMBOS.map((value, index) => (
          <div className="slider-container" key={index}>
            <p>{value.category}</p>
            <Slider items={value.items} showPrice={true} link={URLS.ordersAdd + value.id + '/'} />
          </div>
        ))}
        {!order?.isItemsEmpty() && (
          <NavLink className="view-order-link" to={URLS.ordersCart}>
            <img src={IMG_PATH + 'order-bag.png'} alt="" />
            <div className="order-qty">{order.getItems()?.length}</div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ComboList;
