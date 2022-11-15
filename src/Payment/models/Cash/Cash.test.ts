import {OrderStatus, PaymentMethod} from 'src/@types/order';
import Order from 'src/api/orders/Order';
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
    const cash = new Cash(order, donation);
    expect(cash.pay).toBeInstanceOf(Function);
  });
});
