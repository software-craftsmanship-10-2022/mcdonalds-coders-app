// <<<<<<< HEAD
import {useState} from 'react';
import type Order from 'src/api/orders/Order';
import McButton from 'src/components/buttons/McButton';
import DonationOptions from 'src/components/donation/DonationOptions';
import type {PaymentMethodType} from 'src/components/form/Payment/constants/paymentMethodsTypes';
import {PAYMENT_METHODS} from 'src/components/form/Payment/constants/paymentMethodsTypes';
import PaymentMethodForm from 'src/components/form/Payment/PaymentMethodForm';
import InfoModal from 'src/components/modal/InfoModal';
import {PAYMENT_TYPE} from 'src/config';
import useFormat from 'src/hooks/useFormat';
import acceptOrder from 'src/Payment/acceptOrder';
import type Payment from 'src/Payment/models/Payment/Payment';
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
  order: Order;
  confirmOrder: (payment: Payment, order: Order) => void;
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
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | undefined>(undefined);

  const operationData = paymentMethod === PAYMENT_TYPE.debit ? cardData : bankData;

  const onSelectPaymentMethod = (methodId: string) => {
    const method = PAYMENT_METHODS.find((method) => method.id === methodId);
  };

  return (
    <div className="Detail">
      <div className="detail-box">
        <OrderDetail order={order} />
        <PaymentMethodForm
          selectedPaymentMethodId={paymentMethod}
          onSelectedMethod={updatePaymentMethod}
        />
        {/* <PaymentForm
          defaultPaymentMethod={paymentMethod}
          handleSelectedMethod={updatePaymentMethod}
        /> */}
        {/* {paymentMethod === PAYMENT_TYPE.debit && (
          <PaymentInputs
            setCardCVC={cardUpdate.cvc}
            setCardDate={cardUpdate.date}
            setCardNumber={cardUpdate.number}
            setCardIsValid={updateCardValidity}
          />
        )}
        {paymentMethod === PAYMENT_TYPE.transfer && (
          <TransferInputs setFullName={bankUpdate.fullName} setIBAN={bankUpdate.iban} />
        )} */}
        <DonationOptions
          formDonationIsVisible={formDonationIsVisible}
          updateDonationFormVisibility={updateDonationFormVisibility}
          updateDonationValue={updateDonationValue}
        />
      </div>
      <div className="detail-total">
        <p>Total</p>
        <p>{currencyFormatter().format(order.getTotalPrice() + donationValue)}</p>
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
