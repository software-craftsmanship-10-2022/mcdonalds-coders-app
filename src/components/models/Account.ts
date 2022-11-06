import IValidate from "./IValidate";

const ERROR_FULL_NAME = ("Full name needs first and last name")
const ERROR_SWIFT = ("Swift is not valid")
const REGEX_FULL_NAME = new RegExp("^[a-zA-Z]+( [a-zA-Z]+)+$")


class Account implements IValidate {
    fullName
    swift

    constructor(fullName: string, swift: string) {
        this.fullName = fullName
        this.swift = swift
    }

    isValid(): boolean {
        if(!REGEX_FULL_NAME.test(this.fullName)) throw new Error(ERROR_FULL_NAME)
        if(this.swift.length !== 11) throw new Error(ERROR_SWIFT)
        return true
    }
}

export default Account