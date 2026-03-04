import { Navigate, Outlet, useLocation } from "react-router";
import TopBar from "../components/TopBar";
import { Snackbar } from "@mui/joy";
import { useDesfragmentedToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import MainSideBar from "../components/MainSideBar";
import publicRoutes from "../routes/publicRoutes";

export default function PrivateLayout() {
  const { optionsToast, openToast, messageToast, hideToast } = useDesfragmentedToast()
  const location = useLocation()

  const { isLoading, isAuthenticated } = useAuth()
  if (isLoading) return (<Loading />)

  const isPublicRoute = publicRoutes
    .map(r => r.path)
    .includes(location.pathname)

  console.debug(">> ", isPublicRoute)
  console.error(">> ", isPublicRoute)
  if (!isAuthenticated && !isPublicRoute) {
    return (<Navigate to='/login'></Navigate>)
  }

  return (
    <>
      <div className="grid h-dvh" style={{ gridTemplateColumns: '80px 1fr', gridTemplateRows: '48px 1fr' }}>
        <MainSideBar className="row-span-2 bg-(--joy-palette-primary-500) border-r border-default"></MainSideBar>
        <TopBar />
        <main className="p-6 overflow-auto bg-(--joy-palette-background-level2) h-full">
          <Outlet />
        </main>
      </div>
      <Snackbar
        variant={optionsToast?.variant ?? "solid"}
        color={optionsToast?.color}
        size={optionsToast?.size ?? "lg"}
        open={openToast}
        autoHideDuration={4000}
        onClose={() => hideToast()}
      >
        {messageToast}
      </Snackbar>
    </>
  )

}