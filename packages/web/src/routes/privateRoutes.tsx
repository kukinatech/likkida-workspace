import type { RouteObject } from "react-router";
import { lazyImport } from "../utils/importLazy";
export default [
  {
    path: 'registrar',
    lazy: lazyImport(import("../pages/signup/Registrar")),
  },
  {
    path: 'dashboard',
    lazy: lazyImport(import("../pages/dashboard/Index"))
  },
  {
    path: 'documentos',
    lazy: lazyImport(import("../pages/documentos/Index")),
    children: [
      {
        path: 'faturas',
        lazy: lazyImport(import("../pages/documentos/Index")),
      }
    ]
  },
  {
    path: 'movimentos',
    lazy: lazyImport(import("../pages/movimentos/Index"))
  },
  {
    path: 'artigos',
    lazy: lazyImport(import("../pages/artigos/Index"))
  },
  {
    path: 'clientes',
    lazy: lazyImport(import("../pages/clientes/Index"))
  },
] as RouteObject[]