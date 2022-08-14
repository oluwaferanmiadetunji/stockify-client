import { lazy } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Routes, Route } from 'react-router-dom'
import { ROUTES, API_URL } from 'utils/constants'
import axios from 'axios'
import { Provider } from 'react-redux'
import store, { persistor } from 'redux-store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toast'
import { Navigate } from 'react-router-dom'

axios.defaults.baseURL = API_URL

const Login = lazy(() => import('pages/login'))
const NotFound = lazy(() => import('pages/not-found'))
const Dashboard = lazy(() => import('pages/dashboard'))

const theme = createTheme()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer delay={5000} />
          <Box>
            <Routes>
              <Route path={ROUTES.LOGIN} element={<Login />} />

              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

              <Route path={ROUTES.ERROR} element={<NotFound />} />

              <Route
                path="*"
                element={<Navigate to={ROUTES.ERROR} replace />}
              />
            </Routes>
          </Box>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
