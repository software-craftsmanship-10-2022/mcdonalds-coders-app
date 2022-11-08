import type {ProductCategoryType, ProductType} from 'src/@types/product';

type ProductSelectorProps = {
  productCategory: ProductCategoryType;
  onSelectProduct: (product: ProductType) => void;
};

const ProductSelector = ({productCategory, onSelectProduct}: ProductSelectorProps) => {
  return (
    <div>
      <h3>{productCategory.category}</h3>
      <ProductList products={productCategory.items} onSelectProduct={onSelectProduct} />
    </div>
  );
};

type ProductListProps = {
  products: ProductType[];
  onSelectProduct: (product: ProductType) => void;
};

const ProductList = ({products, onSelectProduct}: ProductListProps) => {
  return (
    <ul>
      {products.map((item) => (
        <li key={item.title}>
          <ProductItem product={item} onSelectProduct={onSelectProduct} />
        </li>
      ))}
    </ul>
  );
};

type ProductItemProps = {
  product: ProductType;
  onSelectProduct: (product: ProductType) => void;
};

const ProductItem = ({product, onSelectProduct}: ProductItemProps) => {
  const onClickItem = () => {
    onSelectProduct(product);
  };

  return (
    <button onClick={onClickItem}>
      <span>{product.title}</span>
      <img alt={product.title} src={product.img} />
    </button>
  );
};

export default ProductSelector;
