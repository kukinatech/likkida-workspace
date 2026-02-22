import { Input, type InputProps } from "@mui/joy";
import { type UseFormRegister } from "react-hook-form";
export type InputPasswordRegister = UseFormRegister<{ password: string }>

export type TProps = {
  register: InputPasswordRegister;
} & Omit<InputProps, 'name'>;

export default function InputPassword({ register, ...rest }: TProps) {
  return (
    <Input
      type="text"
      {...rest}
      {...register('password', {
        required: "Password obrigatório",
        minLength: {
          message: "Password deve ter no minimo 6 digítos",
          value: 6
        }
      })}
    />
  );
}
