import React, {useState} from 'react';
import DonationOptions from 'src/components/donation/DonationOptions';
import type {PaymentMethodType} from 'src/components/form/payment/constants/paymentMethodsTypes';
import {PAYMENT_METHODS} from 'src/components/form/payment/constants/paymentMethodsTypes';
import PaymentMethodForm from 'src/components/form/payment/PaymentMethodForm';
import InfoModal from 'src/components/modal/InfoModal';
import useFormat from 'src/hooks/useFormat';
import OrderDetail from '../../orders/OrderDetail';
import {useDonation, usePaymentWarningModal} from './hooks';

const Checkout = () => {
  const [currencyFormatter] = useFormat();
  const {formDonationIsVisible, donationValue, updateDonationFormVisibility, updateDonationValue} =
    useDonation();
  const {
    modalWarningMessage,
    updateCardWarning,
    warningModalIsVisible,
    toggleWarningModalVisibility,
  } = usePaymentWarningModal();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | undefined>(undefined);

  const onSelectPaymentMethod = (methodId: string) => {
    const method = PAYMENT_METHODS.find((method) => method.id === methodId);
    setSelectedMethod(method);
  };

  const handlePaymentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedMethod) {
      throw new Error();
    }

    const paymentStrategy = selectedMethod?.handleForm(event);
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
