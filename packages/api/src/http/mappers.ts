

export type TResponseMapper = {
    error: boolean
    message: string
    errors: Record<string, string> | null
}
export function HttpResponseMapper(error: boolean = false, message: string, response: Object={}) {
    return { error, message, ...response } as TResponseMapper
}