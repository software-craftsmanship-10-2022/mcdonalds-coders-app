const PAYPAL_USER_ERRORS = {
  usernameMandatory: 'Es necesario especificar un nombre de usuario',
  passwordMandatory: 'Es necesario especificar una contraseña',
};

export class PaypalUser {
  #username: string;
  #password: string;

  constructor(username: string, password: string) {
    this.#username = username;
    this.#password = password;
  }

  isValid(): boolean {
    this.validateUsername();
    this.validatePassword();
    return true;
  }

  private validateUsername() {
    if (!this.#username) throw new Error(PAYPAL_USER_ERRORS.usernameMandatory);
  }

  private validatePassword() {
    if (!this.#password) throw new Error(PAYPAL_USER_ERRORS.passwordMandatory);
  }
}
