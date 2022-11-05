import Card from './Card'

describe("Given a Card class", () => {
    it("should contain the isValid method", () => {
        const card = new Card("231123132", "12/23", 123)
        expect(card.isValid).toBeInstanceOf(Function)
    })

    it("Should validate cardNumber length", () => {

    })

    it("Should throuw an error with length is not valid", () => {
      const card = new Card("231123132", "12/23", 123)

      expect(() => card.isValid()).toThrowError("wrong cardNumber")
    })

    it("Should throuw an error when date is not valid", () => {
      const card = new Card("1299999999999999", "13/23", 123)

      expect(() => card.isValid()).toThrowError("wrong date")
    })
})