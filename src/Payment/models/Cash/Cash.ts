import type IPaymentStrategy from '../IPaymentStrategy';

class Cash implements IPaymentStrategy {
  pay(amount: number) {
    console.log(`Currently paying with cash: ${amount} €`);
  }
}

export default Cash;
