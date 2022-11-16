import {OrderStatus, PaymentMethod} from 'src/@types/order';
import Order from 'src/api/orders/Order';
import Account from '../Account/Account';
import Donation from '../Donation/Donation';
import Transfer from './Transfer';

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

const VALID_IBAN = 'ES5821033533818210523408';

const validAccount = () => new Account('john doe', VALID_IBAN);

describe('Given a Transfer class', () => {
  it('when an instance is created then pay method should be defined', () => {
    const account = validAccount();
    const donation = new Donation(0);
    const order = new Order({
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
    const transfer = new Transfer(order, donation, account);
    expect(transfer.pay).toBeInstanceOf(Function);
  });
});
