import Payment from './Payment'

describe("Given a Debit class", () => {
    it("shoopuld contain a pay method", () => {
        const payment = new Payment()
        expect(payment.pay).toBeInstanceOf(Function)
    })
}) 