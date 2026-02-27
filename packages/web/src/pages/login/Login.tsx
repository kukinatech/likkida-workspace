import { Button, FormControl, FormHelperText, FormLabel } from "@mui/joy";
import Brand from "../../components/Brand";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import InputPassword from "../../components/InputPassword";
import InputEmail from "../../components/InputEmail";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import type { AxiosError } from "axios";
import { LoginUseCase, type BaseErrorForm, type TCreateUserOutputDTO, type THttpResponse } from "@likkida/shared";
import { AuthProviderAxios } from "../../infra/providers/AuthProvider";

export type TInputs = {
  email: string
  password: string
}
const authProvider = new AuthProviderAxios()

export default function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<TInputs>()
  const [isLoading, setloading] = useState(false)
  const showToast = useToast((state) => state.show)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<TInputs> = ({ email, password }) => {
    const loginUseCase = new LoginUseCase(authProvider)

    loginUseCase.execute(email, password)
      .then((data: any) => {
        const response = data as THttpResponse<TCreateUserOutputDTO>

        showToast("Login realizado com sucesso", { color: "success" })
        navigate("/login")
      })
      .catch((erro: AxiosError<{ errors: BaseErrorForm }>) => {
        showToast("Algo correu mal ao fazer o login", { color: "danger" })
        if (!erro.response?.data?.errors) return;
        Object
          .entries(erro.response?.data?.errors)
          .forEach(([field, message]) => {
            setError(field as any, { message })
          })
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
            <InputEmail register={register} />
            <FormHelperText>
              &nbsp;{errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.password}>
            <FormLabel>Passoword <span className="text-red-600">*</span></FormLabel>
            <InputPassword register={register} />
            <FormHelperText>
              &nbsp;{errors.password?.message}
            </FormHelperText>
          </FormControl>
          <div className="flex gap-x-3 justify-between items-center">
            <div>
              <a href="#">Recuperar senha</a>
            </div>
            <div className="flex gap-x-3">
              <Link to="/registrar">
                <Button color="neutral">Signup</Button>
              </Link>
              <Button type="submit" color="primary" loading={isLoading}>Login</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}