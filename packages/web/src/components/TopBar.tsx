import { Box } from "@mui/joy";
import { Info } from "lucide-react";
import Logo from "./Logo";
export default function TopBar() {
    return (
        <Box className="px-6 flex items-center justify-between h-12 w-full bg-(--joy-palette-background-level1) border-b border-default">
            <Logo />
            <div>
                <Info className="cursor-pointer" />
            </div>
        </Box>
    )
}