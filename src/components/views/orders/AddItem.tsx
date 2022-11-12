import {useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import type {ProductType} from 'src/@types/product';
import ProductSelector from 'src/components/product-selector/ProductSelector';
import PRODUCTS from 'src/data/products';
import type {OrderItemType} from '../../../@types/order';
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

  const [count, setCount] = useState(1);
  const {order, updateOrder} = useOrderContext();
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

  // Add selected qty of this item and adds them to the order
  const handleClick = () => {
    const existingItem = order.items.find((item) => item.name === itemData.title);
    // If the item exists in the current order,
    // just add the count to it to avoid duplications
    if (existingItem) {
      existingItem.quantity += count;
      existingItem.complement = selectedComplement;
      existingItem.drink = selectedDrink;
      updateOrder(order);
    } else {
      const newItem: OrderItemType = {
        quantity: count,
        name: itemData.title,
        img: itemData.img,
        pricePerUnit: itemData.price,
        complement: selectedComplement,
        drink: selectedDrink,
      };

      order.items.push(newItem);

      updateOrder({
        ...order,
        total: order.total + newItem.pricePerUnit * count,
      });
    }

    navigate(-1);
  };

  return (
    <div className="AddItem">
      <p className="title">{itemData?.title}</p>
      <img src={`${IMG_PATH}${itemData.img}`} alt="" />
      <p className="price">{priceTag}</p>
      <div className="counter-container">
        <button
          onClick={() => {
            setCount(count === 1 ? count : count - 1);
          }}
        >
          <img src={IMG_PATH + 'minus.png'} alt="" />
        </button>
        <p>{count}</p>
        <button
          onClick={() => {
            setCount(count >= 5 ? count : count + 1);
          }}
        >
          <img src={IMG_PATH + 'plus.png'} alt="" />
        </button>
      </div>

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
