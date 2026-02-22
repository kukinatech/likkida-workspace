import { Button, FormControl, FormHelperText, FormLabel } from "@mui/joy";
import Brand from "../../components/Brand";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import InputUsername from "../../components/InputUsername";
import InputPassword from "../../components/InputPassword";

export type TInputs = {
  username: string
  password: string
}
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<TInputs>()
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    console.debug(data)
  } 
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-110 h-auto flex flex-col gap-y-6.5 px-10 py-6 bg-level1  border border-default">
        <Brand width={80} height={80} texto="Login" />
        <div className="flex flex-col gap-y">
          <FormControl error={!!errors.username}>
            <FormLabel>Username<span className="text-red-600">*</span></FormLabel>
            <InputUsername register={register} />
            <FormHelperText>
              &nbsp;{errors.username?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.password}>
            <FormLabel>Passoword <span className="text-red-600">*</span></FormLabel>
            <InputPassword register={register } />
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
              <Button type="submit" color="primary">Login</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}