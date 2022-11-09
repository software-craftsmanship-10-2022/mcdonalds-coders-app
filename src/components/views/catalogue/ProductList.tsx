import {Navigate, useParams} from 'react-router-dom';
import {URLS} from '../../../config';
import PRODUCTS from '../../../data/products';
import Product from '../../product/Product';
import './ProductList.css';

const ProductList = () => {
  const {category} = useParams<{category?: string}>();
  const categoryData = PRODUCTS.find((productCategory) => productCategory.id === category);

  if (!categoryData) {
    return <Navigate to={URLS.catalogue} replace />;
  }

  return (
    <div className="ProductList">
      <p>{categoryData.category}</p>
      {categoryData.items.map((value, index) => (
        // Load all products of this category
        <Product
          key={index}
          img={value.img}
          title={value.title}
          description={value.description}
          ingredients={value.ingredients}
        />
      ))}
    </div>
  );
};

export default ProductList;
