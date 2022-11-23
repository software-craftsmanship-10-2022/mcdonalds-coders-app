import {mockNewOrder} from 'src/api/orders/mocks/mocks';
import Donation from '../Donation/Donation';
import Cash from './Cash';

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

describe('Given a Cash class', () => {
  it('should contain a pay method', () => {
    const order = mockNewOrder();
    const donation = new Donation(0);
    const cash = new Cash(order, donation);
    expect(cash.pay).toBeInstanceOf(Function);
  });
});
