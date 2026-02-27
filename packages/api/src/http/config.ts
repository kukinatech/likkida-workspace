
import { Router, type Express } from 'express'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

export type TBaseRoute = {
  moduleName?: string
  endpoint?: string
  endepointPlural?: boolean
}
export type TBaseRoutesOption = Record<string, TBaseRoute>;
type TOptionsBootstrap = {
  routes?: TBaseRoutesOption
}

export const getModuleName = (file: string) => {
  const splitedfilePth = file.split('/') as string[]
  return splitedfilePth.shift();
}
export const getModuleEndpointRoot = (moduleName: string, plural: boolean = true) => {
  if (!moduleName?.endsWith('s') && plural) return "/".concat(moduleName!).concat('s');
  return "/".concat(moduleName!)
}

const ROUTES_PATH = join(process.cwd(), "src/modules");

export const loadRouteRoot = async (filePath: string, routes: Record<string, TBaseRoute>, expressRouter: Router) => {
  let endpointRoot;
  let __moduleName;
  try {
    const moduleName = getModuleName(filePath)!
    __moduleName = moduleName
    const options = routes[moduleName]
    const modulePath = pathToFileURL(join(ROUTES_PATH, filePath)).href;
    const module = await import(modulePath);

    let endpointRoot = options?.endpoint ?
      options?.endpoint :
      getModuleEndpointRoot(moduleName, options?.endepointPlural)
    expressRouter.use(endpointRoot, module.default);
    console.log(`[+] Load route ${endpointRoot} | Module [${moduleName}]`)

  } catch (error: any) {
    console.error(`Erro load route ${endpointRoot ?? '[?]'} | Module [${__moduleName}]`, error.message)
  }
}
export function bootstrap(callback: (app: Express, apiRouter: Router) => TOptionsBootstrap | undefined) {
  return async (app: Express) => {
    const apiRouter = Router()
    const options = callback(app, apiRouter)


    if (!existsSync(ROUTES_PATH)) {
      console.error('Directory src/modules not found.')
    }
    const files = (existsSync(ROUTES_PATH) ?
      readdirSync(ROUTES_PATH, { recursive: true, encoding: 'utf-8' }) : ([] as string[]))
      .filter(path => path.endsWith("Routes.js") || path.endsWith("Routes.ts"));
    for (const file of files) {
      loadRouteRoot(file, options?.routes ?? {}, apiRouter)
    }
    app.use('/api', apiRouter);
  }
}