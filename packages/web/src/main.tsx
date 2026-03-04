import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//@ts-ignore
import '@fontsource-variable/space-grotesk';
import './index.css'
import { RouterProvider } from 'react-router';
import router from './routes/index.tsx';
import { CssVarsProvider, GlobalStyles } from '@mui/joy';
import { theme, globalStylesProperties } from './theme.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles styles={globalStylesProperties} />
      <CssVarsProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </CssVarsProvider>
    </QueryClientProvider>
  </StrictMode>
)
