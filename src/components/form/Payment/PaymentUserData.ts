class PaymentUserData {
  cardNumber: string | undefined = undefined;
  cardDate: string | undefined = undefined;
  cardCVC: string | undefined = undefined;
  fullName: string | undefined = undefined;
  iban: string | undefined = undefined;

  // Constructor(
  //   cardNumber: string | undefined,
  //   cardDate: string | undefined,
  //   cardCVC: string | undefined,
  //   fullName: string | undefined,
  //   iban: string | undefined,
  // ) {
  //   this.cardNumber = cardNumber;
  //   this.cardDate = cardDate;
  //   this.cardCVC = cardCVC;
  //   this.fullName = fullName;
  //   this.iban = iban;
  // }
}

export interface IPaymentUserDataBuilder {
  reset: () => void;
  setCardNumber: (number: string) => void;
  setCardDate: (date: string) => void;
  setCardCVC: (cvc: string) => void;
  setFullName: (fullName: string) => void;
  setIban: (iban: string) => void;
}

export class PaymentUserDataBuilder implements IPaymentUserDataBuilder {
  paymentUserData: PaymentUserData;

  constructor() {
    this.paymentUserData = new PaymentUserData();
  }

  reset() {
    this.paymentUserData = new PaymentUserData();
  }

  setCardNumber(number: string) {
    this.paymentUserData.cardNumber = number;
  }

  setCardDate(date: string) {
    this.paymentUserData.cardDate = date;
  }

  setCardCVC(cvc: string) {
    this.paymentUserData.cardCVC = cvc;
  }

  setFullName(fullName: string) {
    this.paymentUserData.fullName = fullName;
  }

  setIban(iban: string) {
    this.paymentUserData.iban = iban;
  }
}
