// <<<<<<< HEAD
import React, {useState} from 'react';
import type Order from 'src/api/orders/Order';
import DonationOptions from 'src/components/donation/DonationOptions';
import type {PaymentMethodType} from 'src/components/form/payment/constants/paymentMethodsTypes';
import {PAYMENT_METHODS} from 'src/components/form/payment/constants/paymentMethodsTypes';
import PaymentMethodForm from 'src/components/form/payment/PaymentMethodForm';
import InfoModal from 'src/components/modal/InfoModal';
import useFormat from 'src/hooks/useFormat';
import type Payment from 'src/Payment/models/Payment/Payment';
import OrderDetail from '../../orders/OrderDetail';
import {useDonation, usePaymentWarningModal} from './hooks';

// Type CardDetailsType = {
//   number: string;
//   date: string;
//   cvc: string;
// };

type DetailProps = {
  order: Order;
  confirmOrder: (payment: Payment, order: Order) => void;
};

const Checkout = ({order, confirmOrder}: DetailProps) => {
  const [currencyFormatter] = useFormat();
  // Const {paymentMethod, updatePaymentMethod} = usePaymentMethod(PAYMENT_TYPE.cash);
  // const {cardData, cardUpdate} = useCardInfo();
  // Const {bankData, bankUpdate} = useBankInfo();
  // const {updateCardValidity} = useIsCardValid();
  const {formDonationIsVisible, donationValue, updateDonationFormVisibility, updateDonationValue} =
    useDonation();
  const {
    modalWarningMessage,
    updateCardWarning,
    warningModalIsVisible,
    toggleWarningModalVisibility,
  } = usePaymentWarningModal();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | undefined>(undefined);

  // Const operationData = paymentMethod === PAYMENT_TYPE.debit ? cardData : bankData;

  const onSelectPaymentMethod = (methodId: string) => {
    const method = PAYMENT_METHODS.find((method) => method.id === methodId);
    setSelectedMethod(method);
  };

  const handlePaymentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectedMethod?.handleForm(event);
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <div className="Detail">
        <div className="detail-box">
          <OrderDetail order={order} />
          <PaymentMethodForm
            selectedPaymentMethodId={selectedMethod ? selectedMethod.id : ''}
            onSelectedMethod={onSelectPaymentMethod}
          />

          {selectedMethod?.formComponent()}

          {/* <button type="submit">Submit</button> */}

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
        <button type="submit" className="McButton fixed">
          Enviar pedido
        </button>
        {/* <McButton
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
        /> */}
        <InfoModal
          toggle={toggleWarningModalVisibility}
          isOpen={warningModalIsVisible}
          title="Atención"
          message={modalWarningMessage}
        />
      </div>
    </form>
  );
};

export default Checkout;
