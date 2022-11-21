import DebitPaymentInputs from '../DebitPaymentInputs';
import TransferPaymentInputs from '../TransferPaymentInputs';

export type PaymentMethodType = {
  id: string;
  text: string;
  formComponent: () => any;
  handleForm: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const PAYMENT_METHODS: PaymentMethodType[] = [
  {
    id: 'cash',
    text: 'Metálico',
    formComponent: () => null,
    handleForm(event: React.FormEvent<HTMLFormElement>) {
      console.log(event, 'cash');
    },
  },
  {
    id: 'debit',
    text: 'Tarjeta',
    formComponent: () => <DebitPaymentInputs />,
    handleForm(event: React.FormEvent<HTMLFormElement>) {
      const target = event.target as typeof event.target & {
        cardNumber: {value: string};
        expiryDate: {value: string};
        cvc: {value: string};
      };
      const cardNumber = target.cardNumber.value;
      const cardDate = target.expiryDate.value;
      const cardCvc = target.cvc.value;
    },
  },
  {
    id: 'transfer',
    text: 'Transferencia',
    formComponent: () => <TransferPaymentInputs />,
    handleForm(event: React.FormEvent<HTMLFormElement>) {
      const target = event.target as typeof event.target & {
        name: {value: string};
        iban: {value: string};
      };
      const name = target.name.value;
      const iban = target.iban.value;
    },
  },
  {
    id: 'paypal',
    text: 'Paypal',
    formComponent: () => null,
    handleForm(event: React.FormEvent<HTMLFormElement>) {
      console.log(event, 'paypal');
    },
  },
];
