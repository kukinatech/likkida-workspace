import { NifInvalidException } from "../Exceptions/NifInvalidException";
import { type IValueObject } from "./IvalueObject";

export class Nif implements IValueObject {
    constructor(private value: string) {
        const regexEmpresa = /^\d{10}$/;
        const regexSingular = /^\d{9}[A-Z]{2}\d{3}$/;

        if (!(regexEmpresa.test(this.value) || regexSingular.test(this.value))) {
            throw new NifInvalidException('nif')
        }
    }
    get(): string {
        return this.value;
    }
} 