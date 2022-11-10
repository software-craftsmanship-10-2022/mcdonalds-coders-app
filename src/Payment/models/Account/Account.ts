import {ACCOUNT_ERRORS} from '../../errorMessages';
import type IValidate from '../IValidate';

class Account implements IValidate {
  private get regexFullName() {
    return /^[a-zA-Z]+( [a-zA-Z]+)+$/;
  }

  constructor(private readonly fullName: string, private readonly swift: string) {}

  isValid(): boolean {
    if (!this.regexFullName.test(this.fullName)) throw new Error(ACCOUNT_ERRORS.fullNameFormat);
    if (this.swift.length !== 11) throw new Error(ACCOUNT_ERRORS.swiftValidation);
    return true;
  }
}

export default Account;
