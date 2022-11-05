import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { OrderType } from "../../../@types/order";
import { IMG_PATH, URLS } from "../../../config";
import { useOrderContext } from "../../../context/OrderContext";
import useFormat from "../../../hooks/useFormat";
import McButton from "../../buttons/McButton";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { order, updateOrder } = useOrderContext();
  const [currencyFormatter] = useFormat();

  const getTotal = useCallback(() => {
    let result = 0;

    for (const item of order.items) {
      result += item.pricePerUnit * item.quantity;
    }

    return result;
  }, [order.items]);

  useEffect(() => {
    // Go back if there is nothing no display
    if (order.items.length <= 0) {
      navigate(-1);
    }

    // Change order stored if the item list changed
    updateOrder((prevOrder: OrderType) => ({
      ...prevOrder,
      total: getTotal(),
    }));
  }, [order.items, navigate, getTotal, updateOrder]);

  // Delete selected item from the order
  const deleteItem = (item: number) => {
    const list = order.items.filter((_, index) => index !== item);
    updateOrder({ ...order, items: list });
  };

  return (
    <div className="Cart">
      {order.items.map((item, index) => (
        <div className="item" key={index}>
          <img src={IMG_PATH + item.img} alt="" />
          <div className="item-info">
            <p>{item.name}</p>
            <p>{`Cantidad: ${item.quantity}`}</p>
            <p>
              {currencyFormatter().format(item.pricePerUnit)}
              <button className="delete-btn" onClick={() => { deleteItem(index); }}>
                Eliminar
              </button>
            </p>
          </div>
        </div>
      ))}
      <div className="cart-info">
        <div className="cart-total">
          <p>Total</p>
          <p>{currencyFormatter().format(getTotal())}</p>
        </div>
        <McButton
          text={"Pagar con la app"}
          onClick={() => { navigate(URLS.ordersCheckout); }}
        />
      </div>
    </div>
  );
};

export default Cart;
