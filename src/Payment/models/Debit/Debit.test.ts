import Card from '../Card/Card';
import Donation from '../Donation/Donation';
import Order from '../Order/Order';
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
const validCard = () => new Card(VALID_CARD_NUMBER, '12/24', 123);

describe('Given a Debit class', () => {
  it('should contain a pay method', () => {
    const card = validCard();
    const order = new Order(200, items, details);
    const donation = new Donation(0);
    const debit = new Debit(order, donation, card);
    expect(debit.pay).toBeInstanceOf(Function);
  });
});
