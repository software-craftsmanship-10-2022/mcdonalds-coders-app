import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {PaymentMethod} from 'src/@types/order';
import {getErrorMessage} from 'src/api/errorHandling/errorHandler';
import type {OrderStateType} from 'src/api/orders/OrderStates/constants';
import {ORDER_STATES, ORDER_STATES_CODES} from 'src/api/orders/OrderStates/constants';
import {useOrderStorage} from 'src/hooks/useOrderStorage';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import './OrderManager.css';
const EMPTY_TIMESTAMPS = {
  [ORDER_STATES_CODES.receivedState]: undefined,
  [ORDER_STATES_CODES.confirmedState]: undefined,
  [ORDER_STATES_CODES.preparingState]: undefined,
  [ORDER_STATES_CODES.readyState]: undefined,
  [ORDER_STATES_CODES.deliveringState]: undefined,
  [ORDER_STATES_CODES.finishedState]: undefined,
};

export const OrderManager = () => {
  const {order, resetOrder} = useOrderContext();
  const storage = useOrderStorage();
  const [currencyFormatter, _, hourFormatter] = useFormat();
  const [updateCounter, setUpdateCounter] = useState(0);
  const [timeStamps, setTimestamps] =
    useState<Record<string, undefined | string>>(EMPTY_TIMESTAMPS);
  const details = order.getDetails();
  const items = order.getItems();
  const stateCode = order.getStateCode();

  useEffect(() => {
    handleTimeStamp();
  }, [updateCounter, order]);

  const handleError = (e: unknown) => {
    const message = getErrorMessage(e);
    toast.error(message);
  };

  const handleTimeStamp = () => {
    if (stateCode === ORDER_STATES_CODES.inProgressState) {
      return;
    }

    const timestamp = hourFormatter().format(order.getState().getCreatedAt());
    setTimestamps({...timeStamps, [stateCode]: timestamp});
  };

  const handleReset = () => {
    resetOrder();
    setTimestamps(EMPTY_TIMESTAMPS);
  };

  const cancelOrder = async () => {
    try {
      order.getState().cancelByRestaurant();
    } catch (e: unknown) {
      handleError(e);
    } finally {
      await storage.setOrder(order);
      setTimestamps(EMPTY_TIMESTAMPS);
      setUpdateCounter(updateCounter + 1);
    }
  };

  const rejectOrder = async () => {
    try {
      order.getState().reject();
      handleReset();
    } catch (e: unknown) {
      handleError(e);
    } finally {
      setTimestamps(EMPTY_TIMESTAMPS);
      setUpdateCounter(updateCounter + 1);
    }
  };

  const nextStep = async () => {
    try {
      order.getState().nextStep();
    } catch (e: unknown) {
      handleError(e);
    } finally {
      await storage.setOrder(order);
      setUpdateCounter(updateCounter + 1);
    }
  };

  const STEPS = [
    ORDER_STATES_CODES.inProgressState,
    ORDER_STATES_CODES.receivedState,
    ORDER_STATES_CODES.confirmedState,
    ORDER_STATES_CODES.preparingState,
    ORDER_STATES_CODES.readyState,
    ORDER_STATES_CODES.deliveringState,
    ORDER_STATES_CODES.finishedState,
  ];

  const formattedSteps: OrderStateType[] = STEPS.map((stepCode: string) => {
    return {
      code: ORDER_STATES[stepCode].code,
      description: ORDER_STATES[stepCode].description,
    };
  });
  const renderStep = (step: OrderStateType) => {
    let active = false;
    if (STEPS.indexOf(stateCode) >= STEPS.indexOf(step.code)) {
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
              stateCode === step.code ? 'order-track-status-dot pulse' : 'order-track-status-dot'
            }
          ></span>
          <span
            className={
              stateCode === step.code ? 'order-track-status-line trace' : 'order-track-status-line'
            }
          ></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">{step.description}</p>
          <span className="order-track-text-sub">
            {timeStamps[step.code] ? timeStamps[step.code] : ''}
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
        <div className="state-buttons">
          <button onClick={nextStep} className="next-btn">
            Avanzar pedido
          </button>
          <button onClick={handleReset} className="reset-btn">
            Resetear pedido
          </button>
          <button onClick={cancelOrder} className="cancel-btn">
            Cancelar pedido
          </button>
          <button onClick={rejectOrder} className="reject-btn">
            Rechazar pedido
          </button>
        </div>
        <div className="state">
          <p>Estado actual del pedido:</p>
          <label>{order.getStateDescription()}</label>
        </div>
        <div className="address">
          <p>Dirección:</p>
          <label>{details.address.split(',').slice(0, 3).join(', ')}</label>
        </div>
        <div className="items">
          <p>Pedido:</p>

          {items.map((item) => (
            <label key={item.id}>x1 {item.name}</label>
          ))}
        </div>
        <div className="info">
          <p>Método de Pago:</p>
          <label>{PaymentMethod[order.getPayment()]}</label>
          <p>Total:</p>
          <label>{currencyFormatter().format(order.getTotalPrice())}</label>
        </div>
      </section>
    </div>
  );
};
