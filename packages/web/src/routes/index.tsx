import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: publicRoutes
  },
  {
    element: <PrivateLayout />,
    children: privateRoutes
  }
]);

export default router