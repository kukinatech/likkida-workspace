import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//@ts-ignore
import '@fontsource-variable/space-grotesk';
import './index.css'
import { RouterProvider } from 'react-router';
import router from './routes/index.tsx';
import {  CssVarsProvider, GlobalStyles } from '@mui/joy';
import theme from './theme.ts';


createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <GlobalStyles styles={{
        "& .lucide": {
          color: "#AAA",
          width: "40px",
          fontSize: "40px",
          height: "40px"
        }
      }} />
      <CssVarsProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </CssVarsProvider>
    </StrictMode>,
  </>
)
