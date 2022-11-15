import {ACCOUNT_ERRORS} from '../../errorMessages';
import type IValidate from '../IValidate';

class Account implements IValidate {
  #regexFullName = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
  #regexIban = /^[A-Z]{2}(?:[ ]?[0-9]){18,20}$/;

  constructor(private readonly fullName: string, private readonly iban: string) {}

  isValid(): boolean {
    if (!this.#regexFullName.test(this.fullName)) throw new Error(ACCOUNT_ERRORS.fullNameFormat);
    if (!this.#regexIban.test(this.iban)) throw new Error(ACCOUNT_ERRORS.ibanFormat);
    return true;
  }
}

export default Account;
