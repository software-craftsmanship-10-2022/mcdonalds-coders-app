import type {ProductCategoryType, ProductType} from 'src/@types/product';

type ProductSelectorProps = {
  productCategory: ProductCategoryType;
  selectedProductTitle: string;
  onSelectProduct: (product: ProductType) => void;
};

const ProductSelector = ({
  productCategory,
  selectedProductTitle,
  onSelectProduct,
}: ProductSelectorProps) => {
  return (
    <div>
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
  selectedProductTitle: string;
  onSelectProduct: (product: ProductType) => void;
};

const ProductList = ({products, selectedProductTitle, onSelectProduct}: ProductListProps) => {
  return (
    <ul>
      {products.map((item) => (
        <li key={item.title}>
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
  selectedProductTitle: string;
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
      <CheckMark isChecked={checkIsSelected()} />
      <span>{product.title}</span>
      <img alt={product.title} src={product.img} />
    </button>
  );
};

type CheckMarkProps = {
  isChecked: boolean;
};

const CheckMark = ({isChecked}: CheckMarkProps) => {
  const selectedCss = () => (isChecked ? ' --selected' : '');

  return <div className={'product-selector__check-mark' + selectedCss()}></div>;
};

export default ProductSelector;
