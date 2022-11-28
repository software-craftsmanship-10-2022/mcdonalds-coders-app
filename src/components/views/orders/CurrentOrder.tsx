import {QRCode} from 'react-qrcode-logo';
import {Navigate, useNavigate} from 'react-router-dom';
import {ORDER_STATES_CODES} from 'src/api/orders/OrderStates/constants';
import McButton from 'src/components/buttons/McButton';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import './CurrentOrder.css';

const CurrentOrder = () => {
  const {order, resetOrder, updateOrder} = useOrderContext();
  const [currencyFormatter] = useFormat();
  const navigate = useNavigate();
  // Restrict access when an order is in place
  if (order?.getStateCode() === ORDER_STATES_CODES.inProgressState) {
    return <Navigate to={URLS.ordersCart} replace />;
  }

  const details = order.getDetails();

  const cancelOrder = () => {
    order.getState().cancelByUser();
    updateOrder(order);
    navigate(URLS.orders);
  };

  const addressTitle = details.isDelivery ? 'Domicilio' : 'Dirección de retiro en el local';
  const mustResetOrder = () => {
    const stateCode = order.getStateCode();
    if (
      stateCode === ORDER_STATES_CODES.cancelledByUserState ||
      stateCode === ORDER_STATES_CODES.cancelledByRestaurantState ||
      stateCode === ORDER_STATES_CODES.rejectedState ||
      stateCode === ORDER_STATES_CODES.finishedState
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="CurrentOrder">
      <div className="title">
        <img src={IMG_PATH + 'order-bag-nobg.png'} alt="" />
        <p>Pedido en curso</p>
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
      <QRCode value="https://mcdapp.vercel.app" size={180} bgColor={'#ffc72c'} />
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
          {currencyFormatter().format(order.getPaymentAmount().totalAmount())}
        </h3>
      </div>
      {order.getStateCode() === ORDER_STATES_CODES.receivedState && (
        <McButton
          text={'Cancelar pedido'}
          color="#da291c"
          onClick={() => {
            cancelOrder();
          }}
          fixed
        />
      )}
      {mustResetOrder() && (
        <McButton
          text={'Resetear pedido'}
          color="#25ea60"
          onClick={() => {
            resetOrder();
          }}
          fixed
        />
      )}
    </div>
  );
};

export default CurrentOrder;
