import { BaseErrorForm } from "./BaseErrorForm";

export class EmailInvalidExeception extends BaseErrorForm {
    constructor(field: string, message: string = 'Email Inválido.') {
        super(field, message);
    }
}