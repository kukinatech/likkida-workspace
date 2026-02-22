import { BaseErrorForm } from "./BaseErrorForm";

export class NifInvalidException extends BaseErrorForm {
    constructor(field: string, message: string = 'Nif Inválido') {
        super(field, message);
    }
}