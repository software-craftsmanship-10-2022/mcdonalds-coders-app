import {useEffect, useState} from 'react';
import type {Categories, Discounts} from 'src/@types/discount';
import Loader from 'src/components/loader/Loader';

import {getDiscounts} from '../../../api/coupons';
import {getErrorMessage} from '../../../api/errorHandling/errorHandler';
import {URLS} from '../../../config';
import DISCOUNT_SLIDES from '../../../data/discountSlides';
import Carousel from '../../carousel/Carousel';
import Slider from '../../slider/Slider';
import './Discount.css';

const Discount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [discounts, setDiscounts] = useState<Discounts | undefined>(undefined);

  useEffect(() => {
    const handleDiscounts = async () => {
      await getDiscounts().then((res) => {
        setDiscounts(res);
        setIsLoading(false);
      });
    };

    handleDiscounts().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Loader fullScreen />}
      {error && <div className="Discount">Error: {getErrorMessage(error)}</div>}
      {discounts && (
        <div className="Discount">
          <Carousel items={DISCOUNT_SLIDES} />
          <div className="slides">
            {discounts.map((value: Categories, index: number) => (
              <div className="slider-container" key={index}>
                <p>{value.category}</p>
                <Slider items={value.items} link={URLS.discounts + value.id + '/'} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Discount;
