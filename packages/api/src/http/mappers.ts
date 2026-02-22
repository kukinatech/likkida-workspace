export function HttpResponseMapper(error: boolean = false, message: string, response: Object={}) {
    return { error, message, ...response }
}