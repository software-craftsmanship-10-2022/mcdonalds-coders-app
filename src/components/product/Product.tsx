import type {ProductType} from '../../@types/product';
import {IMG_PATH} from '../../config';
import IngredientList from './IngredientList/IngredientList';
import './Product.css';

const ProductInfo = ({title, description, ingredients}: ProductType) => (
  <div className="Product-info">
    <p className="Product-title">{title}</p>
    <p className="Product-text">{description}</p>
    {ingredients && ingredients.length > 0 && <IngredientList ingredients={ingredients} />}
  </div>
);

const Product = (props: ProductType) => (
  <div className="Product">
    <img src={IMG_PATH + props.img} alt="" />
    <ProductInfo {...props} />
  </div>
);

export default Product;
