import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {order, updateOrder} = useOrderContext();
  const [currencyFormatter] = useFormat();

  useEffect(() => {
    // Go back if there is nothing no display
    if (order.isItemsEmpty()) {
      navigate(-1);
    }
  }, [order, navigate]);

  // Delete selected item from the order
  const deleteItem = (item: number) => {
    order.removeItem(item);
    updateOrder(order);
  };

  return (
    <div className="Cart">
      {order.getItems()?.map((item, index) => (
        <div className="item" key={index}>
          <img src={IMG_PATH + item.image} alt="" />
          <div className="item-info">
            <p>{item.name}</p>
            <p>{`Cantidad: ${item.price}`}</p>
            <p>
              {currencyFormatter().format(item.price)}
              <button
                className="delete-btn"
                onClick={() => {
                  deleteItem(index);
                }}
              >
                Eliminar
              </button>
            </p>
          </div>
        </div>
      ))}
      <div className="cart-info">
        <div className="cart-total">
          <p>Total</p>
          <p>{currencyFormatter().format(order.getTotalPrice())}</p>
        </div>
        <McButton
          text={'Pagar con la app'}
          onClick={() => {
            navigate(URLS.ordersCheckout);
          }}
        />
      </div>
    </div>
  );
};

export default Cart;
