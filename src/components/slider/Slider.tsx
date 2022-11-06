import './Slider.css';
import {NavLink} from 'react-router-dom';
import {IMG_PATH} from '../../config';
import useFormat from '../../hooks/useFormat';

type SliderProps = {
  items: any[];
  link?: string;
  showPrice?: boolean;
};

const Slider = ({items, link, showPrice}: SliderProps) => {
  const [currencyFormatter] = useFormat();
  return (
    <div className="Slider">
      {items.map((value, index) => (
        <NavLink
          className="slide"
          key={index}
          to={link ? `${link}${index}` : ''}
          state={{
            name: value.title as string,
            img: value.img as string,
            price: (value?.price || '') as number | string,
          }}
        >
          <img src={`${IMG_PATH}${String(value.img)}`} alt=""></img>
          <p className="title" title={value.title as string}>
            {value.title}
          </p>
          {showPrice && <p className="price">{currencyFormatter().format(value.price)}</p>}
        </NavLink>
      ))}
    </div>
  );
};

export default Slider;
