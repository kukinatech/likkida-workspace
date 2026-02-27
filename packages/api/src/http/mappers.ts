import {
    BaseErrorForm,
    type THttpResponse,
    type TResponseMapperParams
} from "@likkida/shared"

export function HttpResponseMapper({
    message,
    error,
    data = null
}: TResponseMapperParams): THttpResponse<any> {
    const errors: Record<string, string> = {}

    if (error instanceof BaseErrorForm) {
        Object.assign(errors, { [error.field]: error.message })
    }
    return {
        message,
        errors: Object.keys(errors).length > 0 ? errors : null,
        data
    }
}