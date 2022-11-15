import {OrderStatus, PaymentMethod} from 'src/@types/order';
import Order from 'src/api/orders/Order';
import Card from '../Card/Card';
import Donation from '../Donation/Donation';
import Debit from './Debit';

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

const VALID_CARD_NUMBER = '1299999999999999';
const validCard = () => new Card(VALID_CARD_NUMBER, '12 / 24', 123);

describe('Given a Debit class', () => {
  it('should contain a pay method', () => {
    const card = validCard();
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
    const donation = new Donation(0);
    const debit = new Debit(order, donation, card);
    expect(debit.pay).toBeInstanceOf(Function);
  });
});
