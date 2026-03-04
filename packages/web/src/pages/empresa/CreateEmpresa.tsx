import { Button, FormControl, FormHelperText, FormLabel, Input, Tooltip } from "@mui/joy";
import Brand from "../../components/Brand";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputEmail from "../../components/InputEmail";
import { EmpresaRepositoryAxios } from "./repositories/EmpresaRespositoryAxios";
import { useState } from "react";
import type { BaseErrorForm, TCreateEmpresaOutputDTO, THttpResponse } from "@likkida/shared";
import type { AxiosError } from "axios";
import { useDesfragmentedToast } from "../../hooks/useToast";
import { Link, useNavigate } from "react-router";
import { dispatchError } from "../../utils/dispatchError";
export type TInputs = {
  nome: string
  nif: string
  email: string
  contactos: string
  endereco: string
}

const empresaRepository = new EmpresaRepositoryAxios()
export default function CreateEmpresa() {
  const [isLoading, setLoading] = useState(false)
  const { showToast } = useDesfragmentedToast()
  const { register, handleSubmit, setError, formState: { errors, } } = useForm<TInputs>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    setLoading(true)
    await empresaRepository.create({
      nome: data.nome,
      email: data.email,
      endereco: data.endereco,
      nif: data.nif,
      contactos: data.contactos
        ? data.contactos.split(',').map(c => c.trim())
        : []
    }).then((data: any) => {
      const response = data as THttpResponse<TCreateEmpresaOutputDTO>
      console.debug(JSON.stringify(response))
      showToast('Empresa criada com sucesso', { color: 'success' })
      navigate(`/login?eId=${response.data.id}`, {
        state: {
          email: response.data.email,
          empresaId: response.data.id,
          nome: response.data.nome
        }
      })
    }).catch((erro: AxiosError<{ errors: BaseErrorForm }>) => {

      if (!erro.response?.data?.errors) return;
      dispatchError(erro.response?.data?.errors, setError)

      showToast('Erro ao criar empresa', { color: 'danger' })
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-110 h-auto flex flex-col gap-y-6.5 px-10 py-6 bg-level1  border border-default">
        <Brand width={80} height={80} texto="Registrar empresa" />
        <div className="flex flex-col gap-y">
          <FormControl error={!!errors.nome}>
            <FormLabel>Nome Legal <span className="text-red-600">*</span></FormLabel>
            <Input {...register('nome', { required: "O nome da empresa é obrigatório" })} disabled={isLoading} data-cy="empresa-nome" />
            <FormHelperText>
              &nbsp;{errors.nome?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.nif}>
            <FormLabel>Nif <span className="text-red-600">*</span></FormLabel>
            <Input {...register('nif', { required: "O nif da empresa é obrigatório" })} disabled={isLoading} data-cy="empresa-nif" />
            <FormHelperText>
              &nbsp;{errors.nif?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.email}>
            <FormLabel>Email <span className="text-red-600">*</span></FormLabel>
            <InputEmail register={register} disabled={isLoading} data-cy="empresa-email" />
            <FormHelperText>
              &nbsp;{errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.contactos}>
            <FormLabel>Contactos</FormLabel>
            <Input {...register('contactos')} disabled={isLoading} data-cy="empresa-contactos" />
            <FormHelperText>
              &nbsp;{errors.contactos?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!errors.endereco}>
            <FormLabel>Endereço</FormLabel>
            <Input  {...register('endereco')} disabled={isLoading} data-cy="empresa-endereco" />
            <FormHelperText>
              &nbsp;{errors.endereco?.message}
            </FormHelperText>
          </FormControl>
          <div className="flex gap-x-3 justify-end">
            <Tooltip title="Entrar como usuário">
              <Link to="/login">
                <Button color="neutral" variant="soft"> Login</Button>
              </Link>
            </Tooltip>
            <Button type="submit" color="primary" loading={isLoading} data-cy="empresa-submit">Registrar</Button>
          </div>
        </div>
      </form>
    </div>
  )
}