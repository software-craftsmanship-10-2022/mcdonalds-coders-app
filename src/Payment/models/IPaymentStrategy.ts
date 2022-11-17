interface IPaymentStrategy {
  pay(amount: number): void;
}

export default IPaymentStrategy;
