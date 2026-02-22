import { Input, type InputProps } from "@mui/joy";
import { type UseFormRegister } from "react-hook-form";
export type InputUsernameRegister = UseFormRegister<{ username: string }>

export type TProps = {
  register: InputUsernameRegister;
} & Omit<InputProps, 'name'>;

export default function InputUsername({ register, ...rest }: TProps) {

  return (
    <Input
      type="text"
      {...rest}
      {...register('username', {
        required: "username é obrigatório",
      })}
    />
  );
}
