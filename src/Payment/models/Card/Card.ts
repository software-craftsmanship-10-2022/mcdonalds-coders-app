import {CARD_ERRORS} from '../../errorMessages';
import type IValidate from '../IValidate';

class Card implements IValidate {
  private get regexDate() {
    return /^(0[1-9]|1[0-2]) \/ (0[1-9]|1[1-9]|2[1-9])$/;
  }

  constructor(
    private readonly cardNumber: string,
    private readonly date: string,
    private readonly cvc: number,
  ) {}

  isValid(): boolean {
    if (this.cardNumber.length !== 16) throw new Error(CARD_ERRORS.wrongCardNumber);
    if (!this.regexDate.test(this?.date)) throw new Error(CARD_ERRORS.wrongDate);
    if (this.cvc.toString().length !== 3) throw new Error(CARD_ERRORS.wrongCvc);

    return true;
  }
}

export default Card;
