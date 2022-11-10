import {QRCode} from 'react-qrcode-logo';
import {Navigate, useNavigate} from 'react-router-dom';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import './CurrentOrder.css';

const CurrentOrder = () => {
  const navigate = useNavigate();
  const {order, resetOrder} = useOrderContext();
  const [currencyFormatter] = useFormat();

  // Restrict access when an order is in place
  if (!order?.isConfirmed()) {
    return <Navigate to={URLS.root} replace />;
  }

  const details = order.getDetails();

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
          {order.getPayment()}
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
