## Criar um CLI para gerar Template semelhante o Nestjs
Objectivo é criar um cli para gerar os boolerplace dos modulos da Api.

### Fluxo
1. Verifica se existe a pasta modules em ./src/ -> ./src/modules. Se não existe cria uma pasta ./src/modules
2. cria o modulo com o nome passado na cli
 `cwa module empresa`
  - cwa: cli workspace admiro
  - module: comando que endica a criação do modulo
  - empresa: Nome do modulo

3. Ao executar o comando deve criar uma pasta em ./src/modules com a seguinte estrutura:
  - empresa/
      /respositories
          EmpresaRepository.ts
      /services
          EmpresaSerivice.ts
      EmpresaRoutes.ts
      EmpresaController.ts
4. cada ficheiro deve conter o seguinte template:
  - EmpresaController.ts
      ` import { type Request, type Response } from "express"
        import { HttpResponseMapper } from "../http/mappers.js"
        import { EmpresaRepository } from "./repositories/EmpresaRepository";

        const empresaRepository: any = new EmpresaRepository();
        export async function createEmpresaController(req: Request<{}, {}, TCreateEmpresaInputDTO>, res: Response) {
            try {
                const response = {}
                return res.status(201).json(HttpResponseMapper(false, 'Empresa criada com sucesso.', response))
            } catch (error: any) {
                return res.status(400).json(HttpResponseMapper(true, error.message))
            }
        }
      `
    ...
    Depois vamos implementar os outros templates. Me pedi os outros template.

## Usa o NodeJs 
  para implementar a cli deve ser global usando o recorso link do npm
## Como deve organizar o codigo
lista as libs que vais usar, o codigo deve ser legivel e deve as responsabilidade por funções 
  cada função deve fazer especificamente uma coisa, sem mesturar responsabilidade.




