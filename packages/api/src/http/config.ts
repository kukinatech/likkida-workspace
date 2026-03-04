
import { Router, type Express } from 'express'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import routeModules from './routes'


export type TOptionRoute = {
  endpoint?: string;
  endepointPlural?: boolean
}
export type TBaseRoute = {
  moduleName: string
  importPath: () => Promise<any>
  options: TOptionRoute | undefined
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

export const loadRouteRoot = async (route: TBaseRoute, expressRouter: Router) => {
  let endpointRoot;
  let __moduleName;
  try {
    const { endepointPlural, endpoint } = route.options ?? {};
    const module = await route.importPath();
    endpointRoot = endpoint ? endpoint :
      getModuleEndpointRoot(route.moduleName, endepointPlural)
    expressRouter.use(endpointRoot, module.default);
    console.log(`[+] Load route ${endpointRoot} | Module [${route.moduleName}]`)
  } catch (error: any) {
    console.error(`Erro load route ${endpointRoot ?? '[?]'} | Module [${__moduleName}]`, error.message)
  }
}
export function bootstrap(callback: (app: Express, apiRouter: Router) => Record<string, TOptionRoute> | undefined) {
  return async (app: Express) => {
    const apiRouter = Router()
    const options = callback(app, apiRouter)
    for (const [moduleName, importPath] of Object.entries(routeModules)) {
      const route = {
        moduleName,
        importPath,
        options: options ? options[moduleName] : {}
      }
      loadRouteRoot(route, apiRouter)
    }
    app.use('/api', apiRouter);
  }
}