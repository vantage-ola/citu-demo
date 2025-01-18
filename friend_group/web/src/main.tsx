import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { CssBaseline } from '@mui/material'
import AppTheme from './theme/AppTheme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppTheme>
    <CssBaseline enableColorScheme />
      <App />
    </AppTheme>
  </StrictMode>,
)
