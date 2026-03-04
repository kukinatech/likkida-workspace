import { Navigate, Outlet } from "react-router";
import TopBar from "../components/TopBar";
import { Snackbar } from "@mui/joy";
import { useDesfragmentedToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function PublicLayout() {
  const { optionsToast, openToast, messageToast, hideToast } = useDesfragmentedToast()
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return (<Loading />)
  if (isAuthenticated) return <Navigate to='/dashboard'></Navigate>
  return (
    <>
      <div className="w-full h-dvh bg-level2">
        <TopBar />
        <div className="h-[calc(100dvh-48px)] w-full">
          <Outlet />
        </div>
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
