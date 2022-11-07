import {IMG_PATH, URLS} from '../../../config';
import './Catalogue.css';

import {NavLink} from 'react-router-dom';
import {useProducts} from '../../../hooks/useProducts';

const Catalogue = () => {
  const {products} = useProducts();
  return (
    <div className="Catalogue">
      {products.map((value, index) => (
        // Map all categories as links
        <NavLink key={index} className={'category-link'} to={URLS.catalogue + value.id}>
          <img src={IMG_PATH + value.items[0].img} alt="" />
          <p>{value.category}</p>
          <img className="category-arrow" src={IMG_PATH + 'right-arrow.png'} alt="" />
        </NavLink>
      ))}
    </div>
  );
};

export default Catalogue;
