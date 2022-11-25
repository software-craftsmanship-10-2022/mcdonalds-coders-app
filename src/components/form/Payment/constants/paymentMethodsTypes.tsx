import type {PaymentStrategy} from 'src/@types/payments';
import Account from 'src/Payment/models/Account/Account';
import Card from 'src/Payment/models/Card/Card';
import {CashPaymentStrategy} from 'src/Payment/models/Cash/Cash';
import {DebitPaymentStrategy} from 'src/Payment/models/Debit/Debit';
import {TransferPaymentStrategy} from 'src/Payment/models/Transfer/Transfer';
import DebitPaymentInputs from '../DebitPaymentInputs';
import TransferPaymentInputs from '../TransferPaymentInputs';

export interface PaymentMethodType {
  id: string;
  text: string;
}

export interface PaymentMethodFormType extends PaymentMethodType {
  formComponent: () => any;
  handleForm: (event: React.FormEvent<HTMLFormElement>) => PaymentStrategy;
}

export const PAYMENT_METHODS: PaymentMethodFormType[] = [
  {
    id: 'cash',
    text: 'Metálico',
    formComponent: () => null,
    handleForm(event: React.FormEvent<HTMLFormElement>) {
      const strategy = new CashPaymentStrategy();
      return strategy;
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

      const card = new Card(cardNumber, cardDate, cardCvc);
      const strategy = new DebitPaymentStrategy(card);
      return strategy;
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

      const account = new Account(name, iban);
      const strategy = new TransferPaymentStrategy(account);
      return strategy;
    },
  },
];
