import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import saveOrder from 'src/api/orders/saveOrder';
import DonationOptions from 'src/components/donation/DonationOptions';
import {useVoucher} from 'src/components/form/Payment/voucher-selector/hooks/useVoucher';
import VoucherSelector from 'src/components/form/Payment/voucher-selector/VoucherSelector';
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
  const {formDonationIsVisible, donationValue, updateDonationFormVisibility, updateDonationValue} =
    useDonation();
  const {selectedVoucher, searchVoucher, clearVoucher, searchedVoucherError} = useVoucher();
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
    const paymentAmount = createPaymentAmount();

    try {
      context.pay(paymentAmount.totalAmount());
      order.setPayment(selectedMethod);
      order.setPaymentAmount(paymentAmount);
      updateOrder(await saveOrder(order));
      navigate(URLS.ordersCurrent);
    } catch (error: unknown) {
      updateCardWarning((error as Error).message);
    }
  };

  const createPaymentAmount = () => {
    return new PaymentAmount(order.getTotalPrice(), donationValue, selectedVoucher);
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

          <div className="voucher-selector-container">
            <VoucherSelector
              selectedVoucher={selectedVoucher}
              searchedVoucherError={searchedVoucherError}
              onClick={searchVoucher}
              onClear={clearVoucher}
            />
          </div>

          <DonationOptions
            formDonationIsVisible={formDonationIsVisible}
            updateDonationFormVisibility={updateDonationFormVisibility}
            updateDonationValue={updateDonationValue}
          />
        </div>
        <TotalDetail paymentAmount={createPaymentAmount()} />
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

type TotalDetailProps = {
  paymentAmount: PaymentAmount;
};

const TotalDetail = ({paymentAmount}: TotalDetailProps) => {
  const [currencyFormatter] = useFormat();

  const renderAmount = () => {
    const amount = paymentAmount.getAmount();
    return <span>{currencyFormatter().format(amount)}</span>;
  };

  const renderVoucher = () => {
    const voucherString = paymentAmount.getVoucherString();
    if (!voucherString) return null;
    return <span className="total-pay__voucher-discount">{`(-${voucherString})`}</span>;
  };

  const renderDonation = () => {
    const donation = paymentAmount.getDonation();
    if (!donation) return null;
    return (
      <span className="total-pay__donation">{` + ${currencyFormatter().format(donation)}`}</span>
    );
  };

  const renderTotal = () => {
    const donation = paymentAmount.getDonation();
    const voucherString = paymentAmount.getVoucherString();
    if (!donation && !voucherString) return null;
    const totalAmount = paymentAmount.totalAmount();
    return <span>{` = ${currencyFormatter().format(totalAmount)}`}</span>;
  };

  return (
    <div className="detail-total">
      <p>Total</p>
      <p>
        {renderAmount()}
        {renderVoucher()}
        {renderDonation()}
        {renderTotal()}
      </p>
    </div>
  );
};
