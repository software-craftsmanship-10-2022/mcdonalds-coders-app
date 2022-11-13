import type {OrderType} from 'src/@types/order';
import McButton from 'src/components/buttons/McButton';
import DonationOptions from 'src/components/donation/DonationOptions';
import PaymentInputs from 'src/components/form/PaymentInputs';
import TransferInputs from 'src/components/form/TransferInputs';
import InfoModal from 'src/components/modal/InfoModal';
import {PAYMENT_TYPE} from 'src/config';
import useFormat from 'src/hooks/useFormat';
import Account from 'src/Payment/models/Account/Account';
import Card from 'src/Payment/models/Card/Card';
import Cash from 'src/Payment/models/Cash/Cash';
import Debit from 'src/Payment/models/Debit/Debit';
import Donation from 'src/Payment/models/Donation/Donation';
import Order from 'src/Payment/models/Order/Order';
import type Payment from 'src/Payment/models/Payment/Payment';
import Transfer from 'src/Payment/models/Transfer/Transfer';
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

  const acceptOrder = () => {
    let payment;
    const donation = new Donation(donationValue);

    try {
      switch (paymentMethod) {
        case PAYMENT_TYPE.debit: {
          const card = new Card(cardData.number, cardData.date, Number(cardData.cvc));
          if (card.isValid()) {
            payment = new Debit(new Order(order.total), donation, card);
          }

          break;
        }

        case PAYMENT_TYPE.transfer:
          {
            const account = new Account(bankData.fullName, bankData.iban);
            if (account.isValid()) {
              payment = new Transfer(new Order(order.total), donation, account);
            }
          }

          break;
        default:
          payment = new Cash(new Order(order.total), donation);
          break;
      }

      if (payment) confirmOrder(payment, paymentMethod);
    } catch (error: unknown) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      updateCardWarning(message);
    }
  };

  return (
    <div className="Detail">
      <div className="detail-box">
        <OrderDetail order={order} />
        <PaymentForm handleSelectedMethod={updatePaymentMethod} />
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
          acceptOrder();
        }}
        fixed
      />
      <InfoModal
        toggle={toggleWarningModalVisibility}
        isOpen={warningModalIsVisible}
        title="Atención"
        message={modalWarningMessage}
      />
    </div>
  );
};

export default Checkout;
