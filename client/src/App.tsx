import { lazy } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

const Login = lazy(() => import('pages/login'))

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
