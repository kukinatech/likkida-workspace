import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import Brand from "../../components/Brand";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import InputEmail from "../../components/InputEmail";
import InputUsername from "../../components/InputUsername";
import InputPassword from "../../components/InputPassword";
import type { TInputs } from "./types/TInputs";
import RegisterService from "./services/RegisterService";
import { useState } from "react";

const registerService = new RegisterService()

export default function Registrar() {
  const { register, handleSubmit, formState: { errors } } = useForm<TInputs>()
  const [isLoading, setloading] = useState(false)
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    setloading(true)
    registerService.execute(
      data.username,
      data.password,
      data.email
    ).catch((erro: any) => {
      console.debug(erro)
    })
      .finally(() => {
        setloading(false)
      })
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