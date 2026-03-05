import { Box, CircularProgress } from "@mui/joy";

export default function Loading() {
  return (
    <Box className=" flex justify-center items-center w-full h-dvh">
      <CircularProgress size="lg" variant="soft" />
    </Box>
  )
}