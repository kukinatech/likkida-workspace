export  class EmailInvalidExeception extends Error {
    constructor() {
        super('Email Inválido.');
    }
}