import type {OrderType} from 'src/@types/order';
import useFormat from 'src/hooks/useFormat';

type OrderDetailProps = {
  order: OrderType;
};
const OrderDetail = ({order}: OrderDetailProps) => {
  const ADDRESS_TYPE = {
    home: 'Domicilio',
    shop: 'Dirección de retiro en el local',
  };
  const [currencyFormatter] = useFormat();
  const getddressLabel = (isDelivery: boolean): string =>
    isDelivery ? ADDRESS_TYPE.home : ADDRESS_TYPE.shop;

  return (
    <div className="detail-box">
      <h1 className="title">
        <strong>Detalle del pedido</strong>
      </h1>
      <div className="address">
        <h3>
          <strong>{getddressLabel(order.details.isDelivery)}</strong>
        </h3>
        <h3>{order.details.address}</h3>
      </div>
      <div className="items">
        <h3>
          <strong>Resumen</strong>
        </h3>
        {order.items.map((value, index) => (
          <div className="item" key={index}>
            <p className="name">{value.name}</p>
            <p>{`x${value.quantity}`}</p>
            <p>{currencyFormatter().format(value.pricePerUnit * value.quantity)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
