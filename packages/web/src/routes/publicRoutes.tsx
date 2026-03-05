import type { RouteObject } from "react-router";
import { lazyImport } from "../utils/importLazy";

export default [
  {
    path: '',
    lazy: lazyImport(import("../App")),

  },
  {
    path: 'login',
    lazy: lazyImport(import("../pages/login/Login"))
  },
  {
    path: 'registrar-empresa',
    element: lazyImport(import("../pages/empresa/CreateEmpresa"))
  },
] as RouteObject[]