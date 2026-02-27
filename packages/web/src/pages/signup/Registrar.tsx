import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import Brand from "../../components/Brand";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import InputEmail from "../../components/InputEmail";
import InputUsername from "../../components/InputUsername";
import InputPassword from "../../components/InputPassword";
import type { TInputs } from "./types/TInputs";
import { useState } from "react";
import type { AxiosError } from "axios";
import { CreateUserUseCase, type BaseErrorForm, type TCreateUserOutputDTO, type THttpResponse } from "@likkida/shared";
import { useToast } from "../../hooks/useToast";
import { UserRepositoryAxios } from "../../infra/repositories/UserRepositoryAxios";

const userRepository = new UserRepositoryAxios()

export default function Registrar() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<TInputs>()
  const [isLoading, setloading] = useState(false)
  const showToast = useToast((state) => state.show)
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<TInputs> = ({ password, email, username }) => {
    const registerUseCase = new CreateUserUseCase(userRepository)
    setloading(true)
    registerUseCase.execute({ username, password, email })
      .then((data: any) => {
        const response = data as THttpResponse<TCreateUserOutputDTO>
          
        console.debug(response)
        showToast("Registro realizado com sucesso", { color: "success" })
        navigate("/login")
      })
      .catch((erro: AxiosError<{ errors: BaseErrorForm }>) => {
        showToast("Algo correu mal ao se regitrar", { color: "danger" })
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
        <Brand width={80} height={80} texto="Registrar" />
        <div className="flex flex-col gap-y">
          <FormControl error={!!errors.username}>
            <FormLabel>Username<span className="text-red-600">*</span></FormLabel>
            <InputUsername register={register} />
            <FormHelperText>
              &nbsp;{errors.username?.message}
            </FormHelperText>
          </FormControl>

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
          <FormControl error={!!errors.cpassword}>
            <FormLabel>Confirmar Passoword <span className="text-red-600">*</span></FormLabel>
            <Input {...register('cpassword', {
              validate: (value, formValues) => value === formValues.password || "As passwords não coincidem"
            })} autoComplete="off" />
            <FormHelperText>
              &nbsp;{errors.cpassword?.message}
            </FormHelperText>
          </FormControl>
          <div className="flex gap-x-3 justify-between items-center">
            <div></div>
            <div className="flex gap-x-3">
              <Link to="/login">
                <Button color="neutral">Login</Button>
              </Link>
              <Button type="submit" color="primary" loading={isLoading}>Signup</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}