
import App from "../App";
import type { RouteObject } from "react-router";
import CreateEmpresa from "../pages/empresa/CreateEmpresa";
import Login from "../pages/login/Login";

export default [
  {
    path: '',
    element: <App />,

  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'registrar-empresa',
    element: <CreateEmpresa />
  },
] as RouteObject[]