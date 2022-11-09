import {Navigate, useParams} from 'react-router-dom';
import {URLS} from '../../../config';
import {useProductsByCategory} from '../../../hooks/useProducts';
import Product from '../../product/Product';

import './ProductList.css';

const ProductList = () => {
  const {category: categoryId} = useParams<{category?: string}>();

  const {productsByCategory} = useProductsByCategory(categoryId);

  if (!productsByCategory) {
    return <Navigate to={URLS.catalogue} replace />;
  }

  return (
    <div className="ProductList">
      <p>{productsByCategory.category}</p>
      {productsByCategory.items.map((value, index) => (
        // Load all products of this category
        <Product key={index} img={value.img} title={value.title} description={value.description} />
      ))}
    </div>
  );
};

export default ProductList;
