import type { IEmpresaRepository, TCreateEmpresaInputDTO, TCreateEmpresaOutputDTO, TEmpresa } from "@likkida/shared";
import BaseRepositoryAxios from "../../../infra/repositories/BaseRepositoryAxios";

export class EmpresaRepositoryAxios extends BaseRepositoryAxios<TCreateEmpresaInputDTO, TCreateEmpresaOutputDTO> implements IEmpresaRepository {
  constructor() { super('/empresas'); }
  findByNif(_nif: string): Promise<TEmpresa | null> {
    throw new Error("Method not implemented.");
  }
}