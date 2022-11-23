import {PaymentInputsWrapper, usePaymentInputs} from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import {css} from 'styled-components';

const DebitPaymentInputs = () => {
  const ERROR_MESSAGES = {
    emptyCardNumber: 'El número de la tarjeta es inválido',
    invalidCardNumber: 'El número de la tarjeta es inválido',
    emptyExpiryDate: 'La fecha de expiración es inválida',
    monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
    yearOutOfRange: 'El año de expiración no puede estar en el pasado',
    dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
    invalidExpiryDate: 'La fecha de expiración es inválida',
    emptyCVC: 'El código de seguridad es inválido',
    invalidCVC: 'El código de seguridad es inválido',
  };

  const {wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps} =
    usePaymentInputs({
      errorMessages: ERROR_MESSAGES,
    });

  return (
    <PaymentInputsWrapper
      {...wrapperProps}
      styles={{
        fieldWrapper: {
          base: css`
            margin-bottom: 1rem;
            width: fit-content;
          `,
          errored: css`
            border-color: red;
          `,
        },
        inputWrapper: {
          base: css`
            border-color: green;
            height: 40px;
          `,
          errored: css`
            border-color: red;
          `,
          focused: css`
            border-color: blue;
          `,
        },
        input: {
          base: css`
            color: green;
            font-size: 14px;
          `,
          errored: css`
            color: red;
          `,
          cardNumber: css`
            width: 15rem;
          `,
          expiryDate: css`
            width: 10rem;
          `,
          cvc: css`
            width: 5rem;
          `,
        },
        errorText: {
          base: css`
            margin-top: 10px;
            color: red;
            font-size: 12px;
          `,
        },
      }}
    >
      <svg {...getCardImageProps({images: images.images})} />
      <input {...getCardNumberProps()} />
      <input {...getExpiryDateProps()} />
      <input {...getCVCProps()} />
    </PaymentInputsWrapper>
  );
};

export default DebitPaymentInputs;
