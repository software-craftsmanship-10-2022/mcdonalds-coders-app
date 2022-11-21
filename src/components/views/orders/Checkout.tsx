import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {OrderStatus} from 'src/@types/order';
import saveOrder from 'src/api/orders/saveOrder';
import DonationOptions from 'src/components/donation/DonationOptions';
import InfoModal from 'src/components/modal/InfoModal';
import {URLS} from 'src/config';
import {useOrderContext} from 'src/context/OrderContext';
import useFormat from 'src/hooks/useFormat';
import {PaymentAmount} from 'src/Payment/models/PaymentAmount/PaymentAmount';
import {PaymentContext} from 'src/Payment/models/PaymentContext/PaymentContext';
import type {PaymentMethodFormType} from '../../form/Payment/constants/paymentMethodsTypes';
import {PAYMENT_METHODS} from '../../form/Payment/constants/paymentMethodsTypes';
import PaymentMethodForm from '../../form/Payment/PaymentMethodForm';
import OrderDetail from '../../orders/OrderDetail';
import {useDonation, usePaymentWarningModal} from './hooks';

const Checkout = () => {
  const navigate = useNavigate();
  const {order, updateOrder} = useOrderContext();
  const [currencyFormatter] = useFormat();
  const {formDonationIsVisible, donationValue, updateDonationFormVisibility, updateDonationValue} =
    useDonation();
  const {
    modalWarningMessage,
    updateCardWarning,
    warningModalIsVisible,
    toggleWarningModalVisibility,
  } = usePaymentWarningModal();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodFormType | undefined>(
    undefined,
  );

  const onSelectPaymentMethod = (methodId: string) => {
    const method = PAYMENT_METHODS.find((method) => method.id === methodId);
    setSelectedMethod(method);
  };

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedMethod) {
      throw new Error();
    }

    const paymentStrategy = selectedMethod?.handleForm(event);
    const context = new PaymentContext(paymentStrategy);
    const paymentAmount = new PaymentAmount(order.getTotalPrice(), donationValue, 0);

    try {
      context.pay(paymentAmount.totalAmount());
      order.setStatus(OrderStatus.preparing);
      order.setPayment(selectedMethod);
      order.setPaymentAmount(paymentAmount);
      updateOrder(await saveOrder(order));
      navigate(URLS.ordersCurrent);
    } catch (error: unknown) {
      updateCardWarning((error as Error).message);
    }
  };

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
