import Debit from './Debit'

describe("Given a Debit class", () => {
    it("shoopuld contain a pay method", () => {
        const debit = new Debit()
        expect(debit.pay).toBeInstanceOf(Function)
    })
}) 