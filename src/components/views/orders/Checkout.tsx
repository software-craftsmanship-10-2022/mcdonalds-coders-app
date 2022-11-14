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
          <TransferInputs setFullName={bankUpdate.fullName} setIBAN={bankUpdate.iban} />
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
