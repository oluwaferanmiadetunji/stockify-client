import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import { Provider } from 'react-redux'
import store, { persistor } from 'redux-store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toast'
import Routes from 'routes'
import ThemeProvider from 'theme'

axios.defaults.baseURL = API_URL

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <ToastContainer delay={5000} />
          <Box>
            <Routes />
          </Box>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App
