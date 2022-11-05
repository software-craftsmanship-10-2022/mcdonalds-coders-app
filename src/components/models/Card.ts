import IValidate from "./Ivalidate";

const ERROR_CARD_NUMBER = "wrong cardNumber"

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
        let dateRegEx = /^(0[1-9]|1[0-2])\/(0[1-9]|1[1-9]|2[1-9])$/;
        if(this.cardNumber.length !== 16) throw new Error(ERROR_CARD_NUMBER)
        if(!dateRegEx.test(this?.date)) throw new Error("wrong date")
        
        return true
    }
}

export default Card