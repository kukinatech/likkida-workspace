import { Outlet } from "react-router";
import TopBar from "../components/TopBar";

export default function PublicLayout() {

    return (
        <div className="w-full h-dvh bg-level2">
            <TopBar />
            <div className="h-[calc(100dvh-48px)] w-full">
                <Outlet />
            </div>
        </div>
    )

}
