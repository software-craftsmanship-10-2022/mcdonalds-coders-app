import {CARD_ERRORS} from '../../errorMessages';
import type IValidate from '../IValidate';

class Card implements IValidate {
  private get regexDate() {
    return /^(0[1-9]|1[0-2]) \/ (0[1-9]|1[1-9]|2[1-9])$/;
  }

  constructor(
    private readonly cardNumber: string,
    private readonly date: string,
    private readonly cvc: string,
  ) {}

  isValid(): boolean {
    this.validateCardNumber();
    this.validateDate();
    this.validateCVC();
    return true;
  }

  private validateCVC() {
    if (!this.cvc) throw new Error(CARD_ERRORS.wrongCvc);
    if (isNaN(Number(this.cvc))) throw new Error(CARD_ERRORS.cvcAsNumber);
    if (this.cvc.length !== 3) throw new Error(CARD_ERRORS.wrongCvc);
  }

  private validateDate() {
    if (!this.date) throw new Error(CARD_ERRORS.dateEmpty);
    if (!this.regexDate.test(this.date)) throw new Error(CARD_ERRORS.wrongDate);
  }

  private validateCardNumber() {
    if (!this.cardNumber || this.cardNumber.length !== 16)
      throw new Error(CARD_ERRORS.wrongCardNumber);
  }
}

export default Card;
