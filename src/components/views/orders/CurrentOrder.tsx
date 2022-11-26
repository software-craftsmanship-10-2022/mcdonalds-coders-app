import {QRCode} from 'react-qrcode-logo';
import {useNavigate} from 'react-router-dom';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import './CurrentOrder.css';

const TWO_SECONDS = 1000 * 2;

const CurrentOrder = () => {
  const navigate = useNavigate();
  const {order, resetOrder, updateOrder} = useOrderContext();
  // Const {setOrderState} = useOrderState();
  const [currencyFormatter] = useFormat();

  // Restrict access when an order is in place
  // if (!order?.isConfirmed()) {
  //   return <Navigate to={URLS.root} replace />;
  // }

  const details = order.getDetails();

  // UseEffect(() => {
  //   changeOrderStatus(order.getId(), OrderStatus.preparing, TWO_SECONDS);
  //   changeOrderStatus(order.getId(), OrderStatus.delivering, TWO_SECONDS * 2);
  // }, []);

  // const changeOrderState = (orderId: string, state: OrderStateType, time: number) => {
  //   setTimeout(() => {
  //     setOrderState(orderId, status)
  //       .then(() => {
  //         order.nextStep();
  //         updateOrder(order);
  //       })
  //       .catch((err: Error) => {
  //         console.log(err);
  //       });
  //   }, time);
  // };

  const cancelOrder = () => {
    resetOrder();
    navigate(URLS.root);
  };

  const addressTitle = details.isDelivery ? 'Domicilio' : 'Dirección de retiro en el local';

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
        <h3>{order.getStateDescription()}</h3>
      </div>
      <div className="address">
        <h3>
          <strong>{addressTitle}</strong>
        </h3>
        <h3>{details.address.split(',').slice(0, 3).join(', ')}</h3>
      </div>
      <QRCode value="https://mcdapp.vercel.app" size={256} bgColor={'#ffc72c'} />
      <div className="info">
        <h1>
          <strong>AM1 - A2T - DKE</strong>
        </h1>
        <h3>
          <strong>Método de Pago: </strong>
          {order.getPayment().text}
        </h3>
        <h3>
          <strong>Total: </strong>
          {currencyFormatter().format(order.getTotalPrice())}
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
