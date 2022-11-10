import {ACCOUNT_ERRORS} from '../../errorMessages';
import type IValidate from '../IValidate';

class Account implements IValidate {
  #regexFullName = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
  #regexIban = /([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{2})\s*\t*(\d{10})/;

  constructor(private readonly fullName: string, private readonly iban: string) {}

  isValid(): boolean {
    if (!this.#regexFullName.test(this.fullName)) throw new Error(ACCOUNT_ERRORS.fullNameFormat);
    if (!this.#regexIban.test(this.iban)) throw new Error(ACCOUNT_ERRORS.ibanFormat);
    return true;
  }
}

export default Account;
