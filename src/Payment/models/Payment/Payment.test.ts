import {OrderStatus, PaymentMethod} from 'src/@types/order';
import Order from 'src/api/orders/Order';
import {DONATION_ERRORS, ORDER_ERRORS, PAYMENT_TYPE_ERRORS} from 'src/Payment/errorMessages';
import Donation from '../Donation/Donation';
import Payment from './Payment';

const items = [
  {
    quantity: 1,
    name: 'McCombo Cuarto De Libra Con Queso Grande',
    img: 'McCOMBOCUARTODELIBRACONQUESOGrande.png',
    pricePerUnit: 1020,
  },
];

const details = {
  name: 'PEATONAL LOMAS DE ZAMORA',
  address: 'Peatona Laprida 177 Lomas de Zamora',
  img: 'indicador.png',
  isDelivery: false,
};

const validOrder = () =>
  new Order({
    id: 'a3',
    details: {
      id: 'a4',
      name: 'name 1',
      address: 'address 1',
      image: 'image 1',
      isDelivery: false,
    },
    items: [],
    payment: PaymentMethod.debit,
    status: OrderStatus.delivering,
  });

describe('Given a Payment class', () => {
  it('when an instance is created then pay method should be defined', () => {
    const payment = new Payment(PaymentMethod.cash, validOrder(), new Donation(0));
    expect(payment.pay).toBeInstanceOf(Function);
  });

  it('when payment type is not setted then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const cash = new Payment(undefined, undefined, undefined);
    expect(() => {
      cash.pay();
    }).toThrowError(PAYMENT_TYPE_ERRORS.noPaymentType);
  });

  it('when payment type is empty string then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const cash = new Payment(undefined, undefined, undefined);
    expect(() => {
      cash.pay();
    }).toThrowError(PAYMENT_TYPE_ERRORS.noPaymentType);
  });

  it('when payment type is not valid then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const cash = new Payment('3242', undefined, undefined);
    expect(() => {
      cash.pay();
    }).toThrowError(PAYMENT_TYPE_ERRORS.typeValue);
  });

  it('when order is not setted then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const cash = new Payment(PaymentMethod.cash, undefined, undefined);
    expect(() => {
      cash.pay();
    }).toThrowError(ORDER_ERRORS.noOrderError);
  });

  it('when order is not typeOf Order then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const cash = new Payment(PaymentMethod.cash, 444, undefined);
    expect(() => {
      cash.pay();
    }).toThrowError(ORDER_ERRORS.typeError);
  });

  it('when donation is not setted then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const cash = new Payment(PaymentMethod.cash, validOrder(), undefined);
    expect(() => {
      cash.pay();
    }).toThrowError(DONATION_ERRORS.noDonationError);
  });

  it('when donation is not typeOf Order then an error should be thrown', () => {
    const donation = new Donation(0);
    // @ts-expect-error desactivamos ts para forzar el test
    const cash = new Payment(PaymentMethod.cash, validOrder(), 444);
    expect(() => {
      cash.pay();
    }).toThrowError(DONATION_ERRORS.typeError);
  });
});
