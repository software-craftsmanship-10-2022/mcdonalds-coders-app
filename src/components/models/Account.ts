import { ACCOUNT_ERRORS } from "../../errorMessages";
import IValidate from "./IValidate";

const REGEX_FULL_NAME = new RegExp("^[a-zA-Z]+( [a-zA-Z]+)+$");

class Account implements IValidate {
  fullName;
  swift;

  constructor(fullName: string, swift: string) {
    this.fullName = fullName;
    this.swift = swift;
  }

  isValid(): boolean {
    if (!REGEX_FULL_NAME.test(this.fullName))
      throw new Error(ACCOUNT_ERRORS.FULL_NAME_FORMAT);
    if (this.swift.length !== 11)
      throw new Error(ACCOUNT_ERRORS.SWIFT_VALIDATION);
    return true;
  }
}

export default Account;
