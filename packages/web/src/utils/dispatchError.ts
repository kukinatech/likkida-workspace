import type { BaseErrorForm } from "@likkida/shared";
import type { UseFormSetError } from "react-hook-form";

export const dispatchError = (errors: BaseErrorForm, setError: UseFormSetError<any>) => {
  Object
    .entries(errors)
    .forEach(([field, message]) => {
      setError(field as any, { message })
    })
}