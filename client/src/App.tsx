import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import { Provider } from 'react-redux'
import store, { persistor } from 'redux-store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toast'
import theme from 'theme'
import Routes from 'routes'

axios.defaults.baseURL = API_URL

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer delay={5000} />
          <Box>
            <Routes />
          </Box>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
