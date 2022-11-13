import {useState} from 'react';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import type {MenuType} from 'src/@types/product';
import type {OrderContextType, OrderItemType} from '../../../@types/order';
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

  const {order, updateOrder} = useOrderContext() || {};
  const [currencyFormatter] = useFormat();
  const priceTag = itemData ? currencyFormatter().format(itemData.price) : '';

  if (!itemData) {
    return <Navigate to={URLS.ordersAdd} replace />;
  }

  // Add selected qty of this item and adds them to the order
  const handleClick = () => {
    const menu: MenuType = {
      id: itemData.id,
      image: itemData.img,
      name: itemData.title,
      price: itemData.price,
      products: [],
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
      <div className="counter-container">
        <button
          onClick={() => {
            setCount(count === 1 ? count : count - 1);
          }}
        >
          <img src={IMG_PATH + 'minus.png'} alt="Quitar" />
        </button>
        <p>{count}</p>
        <button
          onClick={() => {
            setCount(count >= 5 ? count : count + 1);
          }}
        >
          <img src={IMG_PATH + 'plus.png'} alt="Añadir" />
        </button>
      </div>
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
