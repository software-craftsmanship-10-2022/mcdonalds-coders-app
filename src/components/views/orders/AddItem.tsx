import {useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import type {MenuType, ProductType} from 'src/@types/product';
import ProductSelector from 'src/components/product-selector/ProductSelector';
import PRODUCTS from 'src/data/products';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import COMBOS from '../../../data/combos';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import './AddItem.css';

const AddItem = () => {
  const {category, id} = useParams<{category: string; id: string}>();
  const navigate = useNavigate();
  const itemCategory = COMBOS.find((comboCategory) => comboCategory.id === category);
  const itemData = itemCategory?.items.find((item) => item.id === id);

  const {order, updateOrder} = useOrderContext() || {};
  const [currencyFormatter] = useFormat();
  const priceTag = itemData ? currencyFormatter().format(itemData.price) : '';
  const [selectedComplement, setSelectedComplement] = useState<ProductType | undefined>(undefined);
  const [selectedDrink, setSelectedDrink] = useState<ProductType | undefined>(undefined);

  if (!itemData) {
    return <Navigate to={URLS.ordersAdd} replace />;
  }

  const onSelectComplement = (product: ProductType) => {
    const newProduct = product.title === selectedComplement?.title ? undefined : product;
    setSelectedComplement(newProduct);
  };

  const onSelectDrink = (product: ProductType) => {
    const newProduct = product.title === selectedDrink?.title ? undefined : product;
    setSelectedDrink(newProduct);
  };

  const getSelectedProducts = (): ProductType[] => {
    const products: ProductType[] = [];
    if (selectedComplement) products.push(selectedComplement);
    if (selectedDrink) products.push(selectedDrink);
    return products;
  };

  // Add selected qty of this item and adds them to the order
  const handleClick = () => {
    const menu: MenuType = {
      id: itemData.id,
      image: itemData.img,
      name: itemData.title,
      price: itemData.price,
      products: getSelectedProducts(),
    };

    Array.from({length: count}, (_, index) => index).forEach(() => {
      order.addItem(menu);
    });

    updateOrder(order);
    navigate(-1);
  };

  return (
    <div className="AddItem">
      <p className="title">{itemData?.title}</p>
      <img src={`${IMG_PATH}${itemData.img}`} alt="" />
      <p className="price">{priceTag}</p>

      <ProductSelector
        productCategory={PRODUCTS.find((category) => category.id === 'complements')!}
        onSelectProduct={onSelectComplement}
        selectedProductId={selectedComplement?.id}
      />

      <ProductSelector
        productCategory={PRODUCTS.find((category) => category.id === 'drinks')!}
        onSelectProduct={onSelectDrink}
        selectedProductId={selectedDrink?.id}
      />

      <McButton
        text={'Agregar al pedido'}
        onClick={() => {
          handleClick();
        }}
        fixed
      />
    </div>
  );
};

export default AddItem;
