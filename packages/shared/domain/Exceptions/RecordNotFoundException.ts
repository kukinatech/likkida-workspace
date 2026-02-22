export class RecordNotFoundException extends Error {
    constructor(record: string='Record') {
        super(`${record} não existe.`)
    }
}