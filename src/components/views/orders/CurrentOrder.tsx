import {useEffect} from 'react';
import {QRCode} from 'react-qrcode-logo';
import {Navigate, useNavigate} from 'react-router-dom';
import {OrderStatus} from 'src/@types/order.d';
import useOrderStatus from 'src/hooks/useOrderStatus';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import './CurrentOrder.css';

const TWO_SECONDS = 1000 * 2;

const CurrentOrder = () => {
  const navigate = useNavigate();
  const {order, resetOrder, updateOrder} = useOrderContext();
  const {setOrderStatus} = useOrderStatus();
  const [currencyFormatter] = useFormat();

  // Restrict access when an order is in place
  if (!order || !order.confirmed) {
    return <Navigate to={URLS.root} replace />;
  }

  useEffect(() => {
    if (order) {
      changeOrderStatus(order.id, OrderStatus.preparing, TWO_SECONDS);
      changeOrderStatus(order.id, OrderStatus.delivering, TWO_SECONDS * 2);
    }
  }, []);

  const changeOrderStatus = (orderId: string, status: OrderStatus, time: number) => {
    setTimeout(() => {
      setOrderStatus(orderId, status)
        .then(() => {
          updateOrder({...order, status});
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }, time);
  };

  const cancelOrder = () => {
    resetOrder();
    navigate(URLS.root);
  };

  const addressTitle = order.details.isDelivery ? 'Domicilio' : 'Dirección de retiro en el local';

  return (
    <div className="CurrentOrder">
      <div className="title">
        <img src={IMG_PATH + 'order-bag-nobg.png'} alt="" />
        Pedido en curso
      </div>
      <div className="status">
        <h3>
          <strong>Estado del pedido:</strong>
        </h3>
        <h3>{order.status}</h3>
      </div>
      <div className="address">
        <h3>
          <strong>{addressTitle}</strong>
        </h3>
        <h3>{order.details.address.split(',').slice(0, 3).join(', ')}</h3>
      </div>
      <QRCode value="https://mcdapp.vercel.app" size={256} bgColor={'#ffc72c'} />
      <div className="info">
        <h1>
          <strong>AM1 - A2T - DKE</strong>
        </h1>
        <h3>
          <strong>Método de Pago: </strong>
          {order.paymentType}
        </h3>
        <h3>
          <strong>Total: </strong>
          {currencyFormatter().format(order.total)}
        </h3>
      </div>
      <McButton
        text={'Cancelar pedido'}
        color="#da291c"
        onClick={() => {
          cancelOrder();
        }}
        fixed
      />
    </div>
  );
};

export default CurrentOrder;
