import { Box, Button } from "@mui/joy"

function App() {
  return (
    <div>
      <span className="underline pointer-events-none">My App</span>
      <br />
      <Button color="primary" size="lg">Report</Button>
      <Button color="danger" size="md">Delete</Button>
      <Button color="primary" variant="outlined" >Novo link</Button>
      <Button color="neutral" variant="solid" >Neutral</Button>
      <br />
      <Box sx={{ bgcolor: 'background.level2', width: 100, height: 100 }} >My App</Box>
    </div>
  )
}

export default App
