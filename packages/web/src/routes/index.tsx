import { createBrowserRouter } from "react-router";
import App from "../App";
import PublicLayout from "../layouts/PublicLayout";
import RegistrarEmpresa from "../pages/empresa/RegistrarEmpresa";
import Login from "../pages/login/Login";
import Registrar from "../pages/signup/Registrar";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '',
        element: <App />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'registrar',
        element: <Registrar />
      },
      {
        path: 'registrar-empresa',
        element: <RegistrarEmpresa />
      },
    ]
  },
]);

export default router