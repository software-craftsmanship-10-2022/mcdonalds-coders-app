// <<<<<<< HEAD
import React, { useState } from 'react';
import type Order from 'src/api/orders/Order';
import DonationOptions from 'src/components/donation/DonationOptions';
import type { PaymentMethodType } from 'src/components/form/payment/constants/paymentMethodsTypes';
import { PAYMENT_METHODS } from 'src/components/form/payment/constants/paymentMethodsTypes';
import PaymentMethodForm from 'src/components/form/payment/PaymentMethodForm';
import InfoModal from 'src/components/modal/InfoModal';
import { PAYMENT_TYPE } from 'src/config';
import { useOrderContext } from 'src/context/OrderContext';
import useFormat from 'src/hooks/useFormat';
import acceptOrder from 'src/Payment/acceptOrder';
import Card from 'src/Payment/models/Card/Card';
import { DebitPaymentStrategy } from 'src/Payment/models/Debit/Debit';
import type Payment from 'src/Payment/models/Payment/Payment';
import OrderDetail from '../../orders/OrderDetail';
import { useDonation, usePaymentWarningModal } from './hooks';

// Type CardDetailsType = {
//   number: string;
//   date: string;
//   cvc: string;
// };

type DetailProps = {
  order: Order;
  confirmOrder: (payment: Payment, order: Order) => void;
};

const Checkout = () => {
  const [currencyFormatter] = useFormat();
  const {order, updateOrder} = useOrderContext();
  const {paymentMethod, updatePaymentMethod} = usePaymentMethod(PAYMENT_TYPE.cash);
  const {cardData, cardUpdate} = useCardInfo();
  const {/* bankData, */ bankUpdate} = useBankInfo();
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

  /*  const operationData = paymentMethod === PAYMENT_TYPE.debit ? cardData : bankData; */

  // order.setStatus(OrderStatus.pending);
  // order.setPayment(payment.getPaymentType());
  // updateOrder(await saveOrder(order));
  // payment.pay();
  // order.setStatus(OrderStatus.preparing);
  // localStorage.setItem(
  //   STORAGE.orders,
  //   JSON.stringify({
  //     ...order,
  //     total: order.getTotalPrice() + donationValue,
  //     paymentType: payment.getPaymentType(),
  //   }),
  // );
  // navigate(URLS.root);

  const {number, date, cvc} = cardData;

  // cuando tenemos tipo de pag
  const paymentStrategy = new DebitPaymentStrategy(new Card(number, date, cvc));

  order.setPayment(paymentMethod);

  const onSelectPaymentMethod = (methodId: string) => {
    const method = PAYMENT_METHODS.find((method) => method.id === methodId);
    setSelectedMethod(method);
  };

  const handlePaymentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectedMethod?.handleForm(event);
  };
  /*  Const operationData = paymentMethod === PAYMENT_TYPE.debit ? cardData : bankData; */

  // order.setStatus(OrderStatus.pending);
  // order.setPayment(payment.getPaymentType());
  // updateOrder(await saveOrder(order));
  // payment.pay();
  // order.setStatus(OrderStatus.preparing);
  // localStorage.setItem(
  //   STORAGE.orders,
  //   JSON.stringify({
  //     ...order,
  //     total: order.getTotalPrice() + donationValue,
  //     paymentType: payment.getPaymentType(),
  //   }),
  // );
  // navigate(URLS.root);

  const {number, date, cvc} = cardData;

  // Cuando tenemos tipo de pag
  const paymentStrategy = new DebitPaymentStrategy(new Card(number, date, cvc));

  order.setPayment(paymentMethod);

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
      <div className="detail-total">
        <p>Total</p>
        <p>{currencyFormatter().format(order.getTotalPrice() + donationValue)}</p>
      </div>
      <McButton
        text={'Enviar pedido'}
        onClick={() => {
          acceptOrder({
            donation: donationValue,
            order,
            strategy: paymentStrategy,
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
