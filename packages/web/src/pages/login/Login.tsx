import { Button, FormControl, FormHelperText, FormLabel, Tooltip } from "@mui/joy";
import Brand from "../../components/Brand";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import InputPassword from "../../components/InputPassword";
import InputEmail from "../../components/InputEmail";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import type { AxiosError } from "axios";
import { LoginUseCase, type BaseErrorForm, type TCreateUserOutputDTO, type THttpResponse } from "@likkida/shared";
import { AuthProviderAxios } from "../../infra/providers/AuthProvider";
import { dispatchError } from "../../utils/dispatchError";
import { useQueryClient } from "@tanstack/react-query";

export type TInputs = {
  email: string
  password: string
}
const authProvider = new AuthProviderAxios()
let count = 1;
export default function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<TInputs>()
  const [isLoading, setloading] = useState(false)
  const showToast = useToast((state) => state.show)
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { empresaId, nome } = location.state || {}


  console.debug("Re-rendering: ", count++)
  const onSubmit: SubmitHandler<TInputs> = ({ email, password }) => {
    setloading(true)
    const loginUseCase = new LoginUseCase(authProvider)

    loginUseCase.execute(email, password)
      .then((data: any) => {
        const response = data as THttpResponse<TCreateUserOutputDTO>
        queryClient.invalidateQueries({ queryKey: ['auth.me'] })
          .then(() => {
            navigate("/dashboard")
            showToast(response.message, { color: "success" })
          })
      })
      .catch((erro: AxiosError<{ errors: BaseErrorForm }>) => {
        showToast("Algo correu mal ao fazer o login", { color: "danger" })
        if (!erro.response?.data?.errors) return;
        dispatchError(erro.response?.data?.errors, setError)
      })
      .finally(() => { setloading(false) })
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-110 h-auto flex flex-col gap-y-6.5 px-10 py-6 bg-level1  border border-default">
        <Brand width={80} height={80} texto="Login" />
        <div className="flex flex-col gap-y">
          <FormControl error={!!errors.email}>
            <FormLabel>Email<span className="text-red-600">*</span></FormLabel>
            <InputEmail register={register} data-cy="login-email" disabled={isLoading} />

            <FormHelperText>
              &nbsp;{errors.email?.message || (empresaId ? `Digite email da ${nome}` : '')}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.password}>
            <FormLabel>Passoword <span className="text-red-600">*</span></FormLabel>
            <InputPassword register={register} data-cy="login-password" disabled={isLoading} />
            <FormHelperText>
              &nbsp;{errors.password?.message}
            </FormHelperText>
          </FormControl>
          <div className="flex gap-x-3 justify-between items-center my-4">
            <div>
              <a href="#">Recuperar senha</a>
            </div>
            <div className="flex gap-x-3">
              <Tooltip title="Registrar empresa">
                <Link to="/registrar-empresa">
                  <Button color="neutral" variant="soft">Signup</Button>
                </Link>
              </Tooltip>
              <Button type="submit" color="primary" loading={isLoading} data-cy="login-submit">Login</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}