import { type IValueObject } from "./IvalueObject";

export  class Password implements IValueObject {
    constructor(private value: string) {
        if (!this.value) {
            throw new Error('Password Inválida')
        }
    }
    get(): string {
        return this.value
    }
}