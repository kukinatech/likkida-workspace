export type TResponseMapperParams = {
  message: string
  error?: Error
  data?: any
}

export type THttpResponse<T> = {
  message: string
  errors: Record<string, string> | null
  data: T
}