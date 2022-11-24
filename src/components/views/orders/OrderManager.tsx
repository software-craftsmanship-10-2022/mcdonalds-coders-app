import {useState} from 'react';
import type {OrderStateType} from 'src/api/orders/OrderStates/constants';
import {ORDER_STATES} from 'src/api/orders/OrderStates/constants';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import './OrderManager.css';

export const OrderManager = () => {
  const {order, resetOrder} = useOrderContext();
  const [currencyFormatter, _, hourFormatter] = useFormat();
  const [updateCounter, setUpdateCounter] = useState(0);
  const details = order.getDetails();
  const items = order.getItems();
  const cancelOrder = () => {
    order.getState().cancelByRestaurant();
    setUpdateCounter(updateCounter + 1);
  };

  const rejectOrder = () => {
    order.getState().reject();
    setUpdateCounter(updateCounter + 1);
  };

  const nextStep = () => {
    order.getState().nextStep();
    setUpdateCounter(updateCounter + 1);
  };

  const STEPS = [
    'inProgressState',
    'receivedState',
    'confirmedState',
    'preparingState',
    'readyState',
    'deliveringState',
    'finishedState',
  ];

  const formattedSteps: OrderStateType[] = STEPS.map((stepCode: string) => {
    return {
      code: ORDER_STATES[stepCode].code,
      description: ORDER_STATES[stepCode].description,
    };
  });
  const renderStep = (step: OrderStateType) => {
    let active = false;
    if (STEPS.indexOf(order.getStateCode()) >= STEPS.indexOf(step.code)) {
      active = true;
    }

    return (
      <div
        className={active ? 'order-track-step active' : 'order-track-step inactive'}
        key={step.code + 'track'}
      >
        <div className="order-track-status">
          <span
            className={
              order.getStateCode() === step.code
                ? 'order-track-status-dot pulse'
                : 'order-track-status-dot'
            }
          ></span>
          <span
            className={
              order.getStateCode() === step.code
                ? 'order-track-status-line trace'
                : 'order-track-status-line'
            }
          ></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">{step.description}</p>
          <span className="order-track-text-sub">
            {order.getStateCode() === step.code
              ? hourFormatter().format(order.getState().getCreatedAt())
              : ''}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="OrderManager">
      <section>
        <div className="order-track">{formattedSteps.map((step) => renderStep(step))}</div>
      </section>
      <section>
        <div className="address">
          <p>Dirección:</p>
          <label>{details.address.split(',').slice(0, 3).join(', ')}</label>
        </div>
        <div className="items">
          <p>Items:</p>

          {items.map((item) => (
            <label key={item.id}>{item.name}</label>
          ))}
        </div>
        <div className="info">
          <p>Método de Pago:</p>
          <label>{order.getPayment()}</label>
          <p>Total:</p>
          <label>{currencyFormatter().format(order.getTotalPrice())}</label>
        </div>
        <div className="state-buttons">
          <button
            onClick={() => {
              cancelOrder();
            }}
          >
            Cancelar pedido
          </button>
          <button
            onClick={() => {
              nextStep();
            }}
          >
            Avanzar pedido
          </button>
          <button
            onClick={() => {
              rejectOrder();
            }}
          >
            Rechazar pedido
          </button>
        </div>
      </section>
    </div>
  );
};
