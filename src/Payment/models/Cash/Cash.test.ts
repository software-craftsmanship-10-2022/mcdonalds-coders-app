import {CashPaymentStrategy} from './Cash';

describe('Given a CashPaymentStrategy class', () => {
  it('should contain a pay method', () => {
    const cash = new CashPaymentStrategy();
    expect(cash.pay).toBeInstanceOf(Function);
  });
});
