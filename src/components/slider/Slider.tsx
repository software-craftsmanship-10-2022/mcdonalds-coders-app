import {NavLink} from 'react-router-dom';
import {IMG_PATH} from '../../config';
import useFormat from '../../hooks/useFormat';
import './Slider.css';

type SliderProps = {
  items: SliderItem[];
  link?: string;
  showPrice?: boolean;
};
type SliderItem = {
  id: string;
  title: string;
  img: string;
  price: number;
};

const Slider = ({items, link, showPrice}: SliderProps) => {
  const [currencyFormatter] = useFormat();
  return (
    <div className="Slider">
      {items.map((value, index) => (
        <NavLink
          className="slide"
          key={value.id}
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
