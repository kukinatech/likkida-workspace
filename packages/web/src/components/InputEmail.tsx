import { Input, type InputProps } from "@mui/joy";
import { type UseFormRegister } from "react-hook-form";
export type InputEmailRegister = UseFormRegister<{ email: string }>

export type TProps = {
  register: InputEmailRegister;
} & Omit<InputProps, 'name'>;

export default function InputEmail({ register, ...rest }: TProps) {
  return (
    <Input
      type="email"
      {...rest}
      {...register('email', {
        required: "Email é obrigatório",
        pattern: {
          message: "Email inválido",
          value: /^\S+@\S+\.\S+$/
        }
      })}
    />
  );
}
