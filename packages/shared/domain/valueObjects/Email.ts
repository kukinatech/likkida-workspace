import { EmailInvalidExeception } from "../Exceptions/EmailInvalidExeception";
import { type IValueObject } from "./IvalueObject";

export class Email implements IValueObject {
    constructor(private value: string) {
        if (!this.value || !this.value.includes('@')) {
            throw new EmailInvalidExeception('email')
        }
    }
    get(): string {
        return this.value
    }
}