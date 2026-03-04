import Registrar from "../pages/signup/Registrar";
import Dashboard from "../pages/dashboard/Index";
import type { RouteObject } from "react-router";

export default   [
  {
    path: 'registrar',
    element: <Registrar />
  },
  {
    path: 'dashboard',
    element: <Dashboard />
  },
] as RouteObject[]