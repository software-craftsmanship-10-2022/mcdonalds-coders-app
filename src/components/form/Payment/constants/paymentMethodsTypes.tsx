import type {DebitPaymentInputsProps} from '../DebitPaymentInputs';
import DebitPaymentInputs from '../DebitPaymentInputs';
import type {TransferPaymentInputsProps} from '../TransferPaymentInputs';
import TransferPaymentInputs from '../TransferPaymentInputs';

export type PaymentMethodType = {
  id: string;
  text: string;
  formComponent: (props: any) => any;
};

export const PAYMENT_METHODS: PaymentMethodType[] = [
  {
    id: 'cash',
    text: 'Metálico',
    formComponent: () => null,
  },
  {
    id: 'debit',
    text: 'Tarjeta',
    formComponent: (props: DebitPaymentInputsProps) => <DebitPaymentInputs {...props} />,
  },
  {
    id: 'transfer',
    text: 'Transferencia',
    formComponent: (props: TransferPaymentInputsProps) => <TransferPaymentInputs {...props} />,
  },
  {
    id: 'paypal',
    text: 'Paypal',
    formComponent: () => null,
  },
];
