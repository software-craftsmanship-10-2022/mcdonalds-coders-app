import type {OrderType} from 'src/@types/order';
import type {BankDataType} from 'src/components/views/orders/hooks/useBankInfo';
import type {CardDataType} from 'src/components/views/orders/hooks/useCardInfo';
import {PAYMENT_TYPE} from 'src/config';
import Account from './models/Account/Account';
import Card from './models/Card/Card';
import Debit from './models/Debit/Debit';
import Donation from './models/Donation/Donation';
import Order from './models/Order/Order';
import type Payment from './models/Payment/Payment';
import Transfer from './models/Transfer/Transfer';

type AcceptOrderType = {
  order: OrderType;
  paymentMethod: string;
  donationValue: number;
  updateCardWarning: (message: string) => void;
  confirmOrder: (payment: Payment, paymentMethod: string) => void;
  operationData: CardDataType | BankDataType;
};
const acceptOrder = ({
  confirmOrder,
  donationValue,
  operationData,
  order,
  paymentMethod,
  updateCardWarning,
}: AcceptOrderType): void => {
  const donation = new Donation(donationValue);

  const PAYMENT_OPERATION = {
    [PAYMENT_TYPE.debit](operationData: CardDataType) {
      const card = new Card(operationData.number, operationData.date, Number(operationData.cvc));
      if (card.isValid()) {
        return new Debit(new Order(order.total), donation, card);
      }
    },
    [PAYMENT_TYPE.transfer](operationData: BankDataType) {
      const account = new Account(operationData.fullName, operationData.iban);
      if (account.isValid()) {
        return new Transfer(new Order(order.total), donation, account);
      }
    },
  };

  const paymentOperation = (operationData: any) => {
    const payment = PAYMENT_OPERATION[paymentMethod];
    if (!payment) throw new Error('This payment operation cannot be performed');
    return payment(operationData);
  };

  try {
    const payment = paymentOperation(operationData);
    if (payment) confirmOrder(payment, paymentMethod);
  } catch (error: unknown) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    updateCardWarning(message);
  }
};

export default acceptOrder;
