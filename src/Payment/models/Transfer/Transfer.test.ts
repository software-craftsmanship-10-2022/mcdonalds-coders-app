import Account from '../Account/Account';
import Donation from '../Donation/Donation';
import Order from '../Order/Order';
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
    const order = new Order(200, items, details);
    const donation = new Donation(0);
    const transfer = new Transfer(order, donation, account);
    expect(transfer.pay).toBeInstanceOf(Function);
  });
});
