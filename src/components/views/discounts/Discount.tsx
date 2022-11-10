import {URLS} from '../../../config';
import DISCOUNTS from '../../../data/discounts';
import DISCOUNT_SLIDES from '../../../data/discountSlides';
import Carousel from '../../carousel/Carousel';
import Slider from '../../slider/Slider';
import './Discount.css';

const Discount = () => (
  <div className="Discount">
    <Carousel items={DISCOUNT_SLIDES} />
    <div className="slides">
      {DISCOUNTS.map((value, index) => (
        <div className="slider-container" key={index}>
          <p>{value.category}</p>
          <Slider items={value.items} link={URLS.discounts + value.id + '/'} />
        </div>
      ))}
    </div>
  </div>
);

export default Discount;
