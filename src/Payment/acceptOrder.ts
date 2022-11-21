import type Order from 'src/api/orders/Order';
import type {BankDataType} from 'src/components/views/orders/hooks/useBankInfo';
import type {CardDataType} from 'src/components/views/orders/hooks/useCardInfo';
import {PAYMENT_TYPE} from 'src/config';
import Account from './models/Account/Account';
import Card from './models/Card/Card';
import {CashPaymentStrategy} from './models/Cash/Cash';
import {DebitPaymentStrategy} from './models/Debit/Debit';
import type Payment from './models/Payment/Payment';
import {TransferPaymentStrategy} from './models/Transfer/Transfer';

type AcceptOrderType = {
  order: Order;
  paymentMethod: string;
  donationValue: number;
  updateCardWarning: (message: string) => void;
  confirmOrder: (payment: Payment, order: Order) => void;
  operationData: CardDataType | BankDataType;
};
const acceptOrder = ({
  /*   confirmOrder, */
  operationData,
  /*   order, */
  paymentMethod,
  updateCardWarning,
}: AcceptOrderType): void => {
  const PAYMENT_OPERATION = {
    [PAYMENT_TYPE.debit](operationData: CardDataType) {
      const card = new Card(operationData.number, operationData.date, operationData.cvc);

      return new DebitPaymentStrategy(card);
    },
    [PAYMENT_TYPE.transfer](operationData: BankDataType) {
      const account = new Account(operationData.fullName, operationData.iban);
      return new TransferPaymentStrategy(account);
    },
    [PAYMENT_TYPE.cash]() {
      return new CashPaymentStrategy();
    },
  };

  const paymentOperation = (operationData: any) => {
    const payment = PAYMENT_OPERATION[paymentMethod];
    if (!payment) throw new Error('This payment operation cannot be performed');
    return payment(operationData);
  };

  try {
    const payment = paymentOperation(operationData);
    /*     if (payment) confirmOrder(payment, order); */
  } catch (error: unknown) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    updateCardWarning(message);
  }
};

export default acceptOrder;
