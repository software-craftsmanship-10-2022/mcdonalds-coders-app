import {NavLink} from 'react-router-dom';
import type {DiscountItem} from '~types/discount';
import {IMG_PATH} from '../../config';
import useFormat from '../../hooks/useFormat';
import './Slider.css';

type SliderProps = {
  items: any[];
  link?: string;
  showPrice?: boolean;
};

const Slider = ({items, link, showPrice}: SliderProps) => {
  const [currencyFormatter] = useFormat();

  return (
    <div className="Slider">
      {items.map((value: DiscountItem, index) => (
        <NavLink
          className="slide"
          key={index}
          to={link ? `${link}${value.id}` : ''}
          state={{
            name: value.title,
            img: value.img,
            price: (value?.price || '') as number | string,
          }}
        >
          <img src={`${IMG_PATH}${String(value.img)}`} alt=""></img>
          <p className="title" title={value.title}>
            {value.title}
          </p>
          {showPrice && <p className="price">{currencyFormatter().format(value.price)}</p>}
        </NavLink>
      ))}
    </div>
  );
};

export default Slider;
