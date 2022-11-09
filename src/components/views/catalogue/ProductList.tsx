import {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {URLS} from '../../../config';
import {useProducts} from '../../../hooks/useProducts';
import Product from '../../product/Product';

import './ProductList.css';

const ProductList = () => {
  const {category: categoryId} = useParams<{category?: string}>();
  const {categoryProducts, getProductsByCategory} = useProducts();

  useEffect(() => {
    if (categoryId) {
      getProductsByCategory(categoryId);
    }
  }, [categoryId]);

  if (!categoryProducts) {
    return <Navigate to={URLS.catalogue} replace />;
  }

  return (
    <div className="ProductList">
      <p>{categoryProducts.category}</p>
      {categoryProducts.items.map((value, index) => (
        // Load all products of this category
        <Product key={index} img={value.img} title={value.title} description={value.description} />
      ))}
    </div>
  );
};

export default ProductList;
