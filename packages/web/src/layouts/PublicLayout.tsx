import { Outlet } from "react-router";
import TopBar from "../components/TopBar";
import { Snackbar } from "@mui/joy";
import { desfragmentToast } from "../hooks/useToast";

export default function PublicLayout() {
    const { optionsToast, openToast, messageToast, hideToast } = desfragmentToast()

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
