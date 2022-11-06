import IValidate from "./IValidate";

const ERROR_CARD_NUMBER = "wrong card number"
const ERROR_CARD_DATE = "wrong date"
const ERROR_CARD_CVC = "wrong CVC"
const REGEX_DATE = new RegExp("^(0[1-9]|1[0-2])\/(0[1-9]|1[1-9]|2[1-9])$")

class Card implements IValidate {
    cardNumber
    date
    cvc
    
    constructor(cardNumber: string, date: string, cvc: number) {
        this.cardNumber = cardNumber
        this.date = date
        this.cvc = cvc
    }

    isValid(): boolean {
        if(this.cardNumber.length !== 16) throw new Error(ERROR_CARD_NUMBER)
        if(!REGEX_DATE.test(this?.date)) throw new Error(ERROR_CARD_DATE)
        if(this.cvc.toString().length !== 3) throw new Error(ERROR_CARD_CVC)
        
        return true
    }
}

export default Card