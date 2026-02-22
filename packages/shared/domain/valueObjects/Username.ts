import { type IValueObject } from "./IvalueObject";

export  class Username implements IValueObject {
    constructor(private value: string) {
        if (!this.value) {
            throw new Error('Username Inválido')
        }
    }
    get(): string {
        return this.value
    }
}