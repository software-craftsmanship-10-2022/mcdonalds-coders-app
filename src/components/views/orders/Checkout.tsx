import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import TransferInputs from 'src/components/form/TransferInputs';
import McRadio from 'src/components/radio/McRadio';
import {useOrderContext} from 'src/context/OrderContext';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Account from 'src/Payment/models/Account/Account';
import Card from 'src/Payment/models/Card/Card';
import Cash from 'src/Payment/models/Cash/Cash';
import Debit from 'src/Payment/models/Debit/Debit';
import Donation from 'src/Payment/models/Donation/Donation';
import Order from 'src/Payment/models/Order/Order';
import type Payment from 'src/Payment/models/Payment/Payment';
import Transfer from 'src/Payment/models/Transfer/Transfer';
import type {OrderType} from '../../../@types/order';
import {PAYMENT_TYPE, STORAGE, URLS} from '../../../config';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import PaymentInputs from '../../form/PaymentInputs';
import UserForm from '../../form/UserForm';
import InfoModal from '../../modal/InfoModal';
import './Checkout.css';
import {useIsValidatedType} from './hooks';

type CardDetailsType = {
  number: string;
  date: string;
  cvc: string;
};

type DetailProps = {
  order: OrderType;
  confirmOrder: (payment: Payment, selectedMethod: string) => void;
};

const Detail = ({order, confirmOrder}: DetailProps) => {
  const addressTitle = order.details.isDelivery ? 'Domicilio' : 'Dirección de retiro en el local';
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_TYPE.cash);
  const [currencyFormatter] = useFormat();
  // Card information
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  // Card validation check
  const [cardIsValid, setCardIsValid] = useState(false);
  // Bank information
  const [fullName, setFullName] = useState('');
  const [swift, setSWIFT] = useState('');

  // Warning modal
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Donation radios
  const [donationForm, setDonationForm] = useState(false);
  const [donationValue, setDonationValue] = useState(0);

  const handleCardWarning = (message: string) => {
    setModalMessage(message);
    toggleModal();
  };

  const handleDonationForm = (isFormOpen: boolean) => {
    setDonationForm(isFormOpen);
    if (!isFormOpen) setDonationValue(0);
  };

  const radios = [
    {label: '1€', value: 1},
    {label: '5€', value: 5},
    {label: '10€', value: 10},
  ];

  const acceptOrder = () => {
    let payment;
    const donation = new Donation(donationValue);

    try {
      switch (selectedMethod) {
        case PAYMENT_TYPE.debit: {
          const card = new Card(cardNumber, cardDate, Number(cardCVC));
          if (card.isValid()) {
            payment = new Debit(new Order(order.total), donation, card);
          }

          break;
        }

        case PAYMENT_TYPE.transfer:
          {
            const account = new Account(fullName, swift);
            if (account.isValid()) {
              payment = new Transfer(new Order(order.total), donation, account);
            }
          }

          break;
        default:
          payment = new Cash(new Order(order.total), donation);
          break;
      }

      if (payment) confirmOrder(payment, selectedMethod);
    } catch (error: unknown) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      handleCardWarning(message);
    }
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
                      setSelectedMethod(PAYMENT_TYPE.cash);
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
                      setSelectedMethod(PAYMENT_TYPE.debit);
                    }}
                  />
                  {PAYMENT_TYPE.debit}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check className="pay-method-label">
                  <Input
                    type="radio"
                    name="paymethod"
                    className="pay-method-radio"
                    onClick={() => {
                      setSelectedMethod(PAYMENT_TYPE.transfer);
                    }}
                  />
                  {PAYMENT_TYPE.transfer}
                </Label>
              </FormGroup>
            </div>
          </FormGroup>
        </Form>
        {selectedMethod === PAYMENT_TYPE.debit && (
          <PaymentInputs
            setCardCVC={setCardCVC}
            setCardDate={setCardDate}
            setCardNumber={setCardNumber}
            setCardIsValid={setCardIsValid}
          />
        )}
        {selectedMethod === PAYMENT_TYPE.transfer && (
          <TransferInputs setFullName={setFullName} setSWIFT={setSWIFT} />
        )}
        <FormGroup check className="donation-checkbox">
          <Input
            type="checkbox"
            onChange={(e) => {
              handleDonationForm(e.target.checked);
            }}
          />
          <Label check>
            Quieres donar a la <a href="https://fundacionronald.org/">Fundación Ronald McDonald</a>?
          </Label>
        </FormGroup>
        <label className="donation-info">
          Seleccionando esta opción aceptas los{' '}
          <a href="https://fundacionronald.org/aviso-legal/">Terminos y condiciones</a>. El Usuario
          queda informado y acepta que El donativo no supone, en modo alguno, el inicio de una
          relación comercial con la FUNDACION. Más intormación en{' '}
          <a href="https://fundacionronald.org/">https://fundacionronald.org/</a>.
        </label>
        <div className="donation-options">
          {donationForm && <McRadio radios={radios} onChange={setDonationValue} />}
        </div>
      </div>
      <div className="detail-total">
        <p>Total</p>
        <p>{currencyFormatter().format(order.total + donationValue)}</p>
      </div>
      <McButton
        text={'Enviar pedido'}
        onClick={() => {
          acceptOrder();
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
  const {isUserValidated, updateUserValidatedStatus} = useIsValidatedType();

  const {order, updateOrder} = useOrderContext();
  const {getStorageItem} = useLocalStorage();

  useEffect(() => {
    // Exit if there is no order in the state
    if (order.items.length <= 0) {
      navigate(URLS.root);
    }

    // @TODO refactor localstorage
    const user = getStorageItem(STORAGE.users); // eslint-disable-line
    if (user) {
      updateUserValidatedStatus(true);
    }
  }, [order, navigate, getStorageItem]);

  const confirmOrder = (payment: Payment, selectedMethod: string) => {
    updateOrder({...order, confirmed: true, paymentType: selectedMethod});
    console.log(payment);
    payment.pay();
    // Console.log(details);
    navigate(URLS.root);
  };

  return (
    <div className="Checkout">
      {!isUserValidated && <UserForm setIsValidated={updateUserValidatedStatus} />}
      {isUserValidated && <Detail order={order} confirmOrder={confirmOrder} />}
    </div>
  );
};

export default Checkout;
