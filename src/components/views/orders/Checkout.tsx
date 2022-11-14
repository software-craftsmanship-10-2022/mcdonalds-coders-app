import type {OrderType} from 'src/@types/order';
import McButton from 'src/components/buttons/McButton';
import DonationOptions from 'src/components/donation/DonationOptions';
import PaymentInputs from 'src/components/form/PaymentInputs';
import TransferInputs from 'src/components/form/TransferInputs';
import InfoModal from 'src/components/modal/InfoModal';
import {PAYMENT_TYPE} from 'src/config';
import useFormat from 'src/hooks/useFormat';
import acceptOrder from 'src/Payment/acceptOrder';
import type Payment from 'src/Payment/models/Payment/Payment';
import PaymentForm from '../../form/PaymentForm';
import OrderDetail from '../../orders/OrderDetail';
import {
  useBankInfo,
  useCardInfo,
  useDonation,
  useIsCardValid,
  usePaymentMethod,
  usePaymentWarningModal,
} from './hooks';

type CardDetailsType = {
  number: string;
  date: string;
  cvc: string;
};

type DetailProps = {
  order: OrderType;
  confirmOrder: (payment: Payment, paymentMethod: string) => void;
};

const Checkout = ({order, confirmOrder}: DetailProps) => {
  const [currencyFormatter] = useFormat();
<<<<<<< HEAD
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
            payment = new Debit(new Order(order.total, order.items, order.details), donation, card);
          }

          break;
        }

        case PAYMENT_TYPE.transfer:
          {
            const account = new Account(fullName, swift);
            if (account.isValid()) {
              payment = new Transfer(
                new Order(order.total, order.items, order.details),
                donation,
                account,
              );
            }
          }

          break;
        default:
          payment = new Cash(new Order(order.total, order.items, order.details), donation);
          break;
      }

      if (payment) confirmOrder(payment, selectedMethod);
    } catch (error: unknown) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      handleCardWarning(message);
    }
  };
=======
  const {paymentMethod, updatePaymentMethod} = usePaymentMethod(PAYMENT_TYPE.cash);
  const {cardData, cardUpdate} = useCardInfo();
  const {bankData, bankUpdate} = useBankInfo();
  const {updateCardValidity} = useIsCardValid();
  const {formDonationIsVisible, donationValue, updateDonationFormVisibility, updateDonationValue} =
    useDonation();
  const {
    modalWarningMessage,
    updateCardWarning,
    warningModalIsVisible,
    toggleWarningModalVisibility,
  } = usePaymentWarningModal();

  const operationData = paymentMethod === PAYMENT_TYPE.debit ? cardData : bankData;
>>>>>>> 656053d79c830a9a9bedd6f0ad944eff1d4c5c00

  return (
    <div className="Detail">
      <div className="detail-box">
        <OrderDetail order={order} />
        <PaymentForm
          defaultPaymentMethod={paymentMethod}
          handleSelectedMethod={updatePaymentMethod}
        />
        {paymentMethod === PAYMENT_TYPE.debit && (
          <PaymentInputs
            setCardCVC={cardUpdate.cvc}
            setCardDate={cardUpdate.date}
            setCardNumber={cardUpdate.number}
            setCardIsValid={updateCardValidity}
          />
        )}
        {paymentMethod === PAYMENT_TYPE.transfer && (
          <TransferInputs setFullName={bankUpdate.fullName} setSWIFT={bankUpdate.iban} />
        )}
        <DonationOptions
          formDonationIsVisible={formDonationIsVisible}
          updateDonationFormVisibility={updateDonationFormVisibility}
          updateDonationValue={updateDonationValue}
        />
      </div>
      <div className="detail-total">
        <p>Total</p>
        <p>{currencyFormatter().format(order.total + donationValue)}</p>
      </div>
      <McButton
        text={'Enviar pedido'}
        onClick={() => {
          acceptOrder({
            confirmOrder,
            donationValue,
            operationData,
            order,
            paymentMethod,
            updateCardWarning,
          });
        }}
        fixed
      />
<<<<<<< HEAD
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
    if (order.items.length <= 0) {
      navigate(URLS.root);
    }

    // @TODO refactor localstorage
    const user = getStorageItem(STORAGE.users); // eslint-disable-line
    if (user) {
      setIsValidated(true);
    }
  }, [order, navigate, getStorageItem]);

  const confirmOrder = (payment: Payment, selectedMethod: string) => {
    updateOrder({...order, confirmed: true, paymentType: selectedMethod});
    payment.pay();
    // Console.log(details);
    navigate(URLS.root);
  };

  return (
    <div className="Checkout">
      {!isValidated && <UserForm setIsValidated={setIsValidated} />}
      {isValidated && <Detail order={order} confirmOrder={confirmOrder} />}
=======
      <InfoModal
        toggle={toggleWarningModalVisibility}
        isOpen={warningModalIsVisible}
        title="Atención"
        message={modalWarningMessage}
      />
>>>>>>> 656053d79c830a9a9bedd6f0ad944eff1d4c5c00
    </div>
  );
};

export default Checkout;
