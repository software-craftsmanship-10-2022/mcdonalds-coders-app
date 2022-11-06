import Account from "./Account"

describe("Given an Account class", () => {
    it("should exist that class", () => {
        const account = new Account("john doe", "SECTARB1XXX")
        expect(account).toBeInstanceOf(Object)
    })

    it("Should throw an error when fullName is not valid", () => {
        const account = new Account("john", "SECTARB1XXX")
        expect(() => account.isValid()).toThrowError("Full name needs first and last name")
    })

    it("Should throw an error when swift has not 11 characters", () => {
        const account = new Account("john doe", "SCTARB1XXX")
        expect(() => account.isValid()).toThrowError("Swift is not valid")
    })
})