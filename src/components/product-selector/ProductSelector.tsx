import type {ProductCategoryType, ProductType} from 'src/@types/product';
import {IMG_PATH} from 'src/config';
import './ProductSelector.css';

type ProductSelectorProps = {
  productCategory: ProductCategoryType;
  selectedProductTitle: string | undefined;
  onSelectProduct: (product: ProductType) => void;
};

const ProductSelector = ({
  productCategory,
  selectedProductTitle,
  onSelectProduct,
}: ProductSelectorProps) => {
  return (
    <div className="product-selector">
      <h3>{productCategory.category}</h3>
      <ProductList
        products={productCategory.items}
        onSelectProduct={onSelectProduct}
        selectedProductTitle={selectedProductTitle}
      />
    </div>
  );
};

type ProductListProps = {
  products: ProductType[];
  selectedProductTitle: string | undefined;
  onSelectProduct: (product: ProductType) => void;
};

const ProductList = ({products, selectedProductTitle, onSelectProduct}: ProductListProps) => {
  return (
    <ul className={'product-selector__product-list'}>
      {products.map((item) => (
        <li key={item.title} className="product-selector__product-item">
          <ProductItem
            product={item}
            onSelectProduct={onSelectProduct}
            selectedProductTitle={selectedProductTitle}
          />
        </li>
      ))}
    </ul>
  );
};

type ProductItemProps = {
  product: ProductType;
  selectedProductTitle: string | undefined;
  onSelectProduct: (product: ProductType) => void;
};

const ProductItem = ({product, selectedProductTitle, onSelectProduct}: ProductItemProps) => {
  const onClickItem = () => {
    onSelectProduct(product);
  };

  const checkIsSelected = () => {
    return product.title === selectedProductTitle;
  };

  const ariaLabel = () => (checkIsSelected() ? 'seleccionado' : 'no seleccionado');

  const selectedCss = () => (checkIsSelected() ? ' --selected' : '');

  return (
    <button
      onClick={onClickItem}
      className={'product-selector__item-button' + selectedCss()}
      aria-label={ariaLabel()}
    >
      <span>{product.title}</span>
      <img
        alt={product.title}
        src={IMG_PATH + product.img}
        className="product-selector__item-image"
      />
    </button>
  );
};

export default ProductSelector;
