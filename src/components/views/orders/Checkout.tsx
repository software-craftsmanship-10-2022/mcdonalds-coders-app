import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {OrderStatus, PaymentMethod} from '../../../@types/order';
import type Order from 'src/api/orders/Order';
import {PAYMENT_TYPE, STORAGE, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import useLocalStorage from '../../../hooks/useLocalStorage';
import McButton from '../../buttons/McButton';
import PaymentInputs from '../../form/PaymentInputs';
import UserForm from '../../form/UserForm';
import InfoModal from '../../modal/InfoModal';
import './Checkout.css';
import saveOrder from 'src/api/orders/saveOrder';

type CardDetailsType = {
  number: string;
  date: string;
  cvc: string;
};

type DetailProps = {
  order: Order;
  confirmOrder: (paymentMethod: PaymentMethod, details: CardDetailsType) => void;
};

const Detail = ({order, confirmOrder}: DetailProps) => {
  const addressTitle = order.getDetails().isDelivery
    ? 'Domicilio'
    : 'Dirección de retiro en el local';

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PaymentMethod.cash);
  const [currencyFormatter] = useFormat();
  // Card information
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  // Card validation check
  const [cardIsValid, setCardIsValid] = useState(false);

  // Warning modal
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCardWarning = (message: string) => {
    setModalMessage(message);
    toggleModal();
  };

  return (
    <div className="Detail">
      <div className="detail-box">
        <h1 className="title">
          <strong>Detalle del pedido</strong>
        </h1>
        <div className="address">
          <h3>
            <strong>{addressTitle}</strong>
          </h3>
          <h3>{order.getDetails().address}</h3>
        </div>
        <div className="items">
          <h3>
            <strong>Resumen</strong>
          </h3>
          {order.getItems().map((item, index) => (
            <div className="item" key={index}>
              <p className="name">{item.name}</p>
              <p>{`x${item.price}`}</p>
              {/* @TODO calcuate price by total separating by items */}
              <p>{currencyFormatter().format(item.price)}</p>
            </div>
          ))}
        </div>
        <Form>
          <FormGroup tag="fieldset">
            <h1>
              <strong>Método de pago</strong>
            </h1>
            <div className="radio-group">
              <FormGroup check>
                <Label check className="pay-method-label">
                  <Input
                    type="radio"
                    defaultChecked={true}
                    name="paymethod"
                    className="pay-method-radio"
                    onClick={() => {
                      setSelectedMethod(PaymentMethod.cash);
                    }}
                  />
                  {PAYMENT_TYPE.cash}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check className="pay-method-label">
                  <Input
                    type="radio"
                    name="paymethod"
                    className="pay-method-radio"
                    onClick={() => {
                      setSelectedMethod(PaymentMethod.debit);
                    }}
                  />
                  {PAYMENT_TYPE.debit}
                </Label>
              </FormGroup>
            </div>
          </FormGroup>
        </Form>
        {selectedMethod === PaymentMethod.cash && (
          <PaymentInputs
            setCardCVC={setCardCVC}
            setCardDate={setCardDate}
            setCardNumber={setCardNumber}
            setCardIsValid={setCardIsValid}
          />
        )}
      </div>
      <div className="detail-total">
        <p>Total</p>
        <p>{currencyFormatter().format(order.getTotalPrice())}</p>
      </div>
      <McButton
        text={'Enviar pedido'}
        onClick={() => {
          if (selectedMethod === PaymentMethod.debit && !cardIsValid) {
            handleCardWarning('La información de la tarjeta es inválida');
          } else {
            confirmOrder(selectedMethod, {
              number: cardNumber,
              date: cardDate,
              cvc: cardCVC,
            });
          }
        }}
        fixed
      />
      <InfoModal toggle={toggleModal} isOpen={showModal} title="Atención" message={modalMessage} />
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  // User validation check
  const [isValidated, setIsValidated] = useState(false);
  const {order, updateOrder} = useOrderContext();
  const {getStorageItem} = useLocalStorage();

  useEffect(() => {
    // Exit if there is no order in the state
    if (order.isItemsEmpty()) {
      navigate(URLS.root);
    }

    // @TODO refactor localstorage
    const user = getStorageItem(STORAGE.users); // eslint-disable-line
    if (user) {
      setIsValidated(true);
    }
  }, [order, navigate, getStorageItem]);

  const confirmOrder = async (payment: PaymentMethod, _details: CardDetailsType) => {
    order.setStatus(OrderStatus.pending);
    order.setPayment(payment);
    updateOrder(await saveOrder(order));
    navigate(URLS.root);
  };

  return (
    <div className="Checkout">
      {!isValidated && <UserForm setIsValidated={setIsValidated} />}
      {isValidated && <Detail order={order} confirmOrder={confirmOrder} />}
    </div>
  );
};

export default Checkout;
