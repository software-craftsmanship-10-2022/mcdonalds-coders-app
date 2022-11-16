import type Order from 'src/api/orders/Order';
import useFormat from 'src/hooks/useFormat';

type OrderDetailProps = {
  order: Order;
};
const OrderDetail = ({order}: OrderDetailProps) => {
  const ADDRESS_TYPE = {
    home: 'Domicilio',
    shop: 'Dirección de retiro en el local',
  };
  const [currencyFormatter] = useFormat();
  const getAddressLabel = (isDelivery: boolean): string =>
    isDelivery ? ADDRESS_TYPE.home : ADDRESS_TYPE.shop;

  return (
    <div className="detail-box">
      <h1 className="title">
        <strong>Detalle del pedido</strong>
      </h1>
      <div className="address">
        <h3>
          <strong>{getAddressLabel(order.getDetails().isDelivery)}</strong>
        </h3>
        <h3>{order.getDetails().address}</h3>
      </div>
      <div className="items">
        <h3>
          <strong>Resumen</strong>
        </h3>
        {order.getItems().map((value, index) => (
          <div className="item" key={index}>
            <p className="name">{value.name}</p>
            {/* <p>{`x${value.quantity}`}</p> */}
            <p>{currencyFormatter().format(value.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
