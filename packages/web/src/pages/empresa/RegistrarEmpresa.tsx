import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import Brand from "../../components/Brand";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputEmail from "../../components/InputEmail";

export type TInputs = {
  nome: string
  nif: string
  email: string
  contactos: string
  endereco: string
}
export default function RegistrarEmpresa() {
  const { register, handleSubmit, formState: { errors } } = useForm<TInputs>()
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    console.debug(data)
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-110 h-auto flex flex-col gap-y-6.5 px-10 py-6 bg-level1  border border-default">
        <Brand width={80} height={80} texto="Registrar empresa" />
        <div className="flex flex-col gap-y">
          <FormControl error={!!errors.nome}>
            <FormLabel>Nome Legal <span className="text-red-600">*</span></FormLabel>
            <Input {...register('nome', { required: "O nome da empresa é obrigatório" })} />
            <FormHelperText>
              &nbsp;{errors.nome?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.nif}>
            <FormLabel>Nif <span className="text-red-600">*</span></FormLabel>
            <Input {...register('nif', { required: "O nif da empresa é obrigatório" })} />
            <FormHelperText>
              &nbsp;{errors.nif?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.email}>
            <FormLabel>Email <span className="text-red-600">*</span></FormLabel>
            <InputEmail register={register} />
            <FormHelperText>
              &nbsp;{errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.contactos}>
            <FormLabel>Contactos</FormLabel>
            <Input {...register('contactos')} />
            <FormHelperText>
              &nbsp;{errors.contactos?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.endereco}>
            <FormLabel>Endereço</FormLabel>
            <Input {...register('endereco')} />
            <FormHelperText>
              &nbsp;{errors.endereco?.message}
            </FormHelperText>
          </FormControl>
          <div className="flex gap-x-3 justify-end">
            <Button color="neutral">Voltar</Button>
            <Button type="submit" color="primary">Registrar</Button>
          </div>
        </div>
      </form>
    </div>
  )
}