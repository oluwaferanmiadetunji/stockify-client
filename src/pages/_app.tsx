/* eslint-disable react-hooks/exhaustive-deps */
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import 'assets/css/nucleo-icons.css'
import 'assets/scss/blk-design-system-react.scss'
import 'assets/demo/demo.css'
import 'react-toastify/dist/ReactToastify.css'
import ThemeProvider, { createEmotionCache } from 'theme'
import { CacheProvider } from '@emotion/react'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { API_URL } from 'utils/constant'
import { SessionProvider, useSession, signIn } from 'next-auth/react'
import { ReactNode, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import { isValidToken, saveToken } from 'utils/helpers'
import Router from 'next/router'
import LoadingScreen from 'components/loader'

const clientSideEmotionCache = createEmotionCache()

axios.defaults.baseURL = API_URL

function Auth({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  let isAuthenticated = true

  if (status !== 'loading' && session != undefined) {
    //@ts-ignore
    const token = session?.accessToken || ''

    isAuthenticated = isValidToken(token)
  }

  useEffect(() => {
    if (status === 'loading') return

    if (!isAuthenticated) signIn()
  }, [isAuthenticated, status])

  if (isAuthenticated) {
    //@ts-ignore
    saveToken(session?.accessToken || '')
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgb(11, 15, 25)',
      }}
    >
      <CircularProgress size={50} sx={{ color: 'white' }} />
    </Box>
  )
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  //@ts-ignore
  emotionCache = clientSideEmotionCache,
}: AppProps) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true))
    Router.events.on('routeChangeComplete', () => setLoading(false))
    Router.events.on('routeChangeError', () => setLoading(false))

    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true))
      Router.events.off('routeChangeComplete', () => setLoading(false))
      Router.events.off('routeChangeError', () => setLoading(false))
    }
  }, [Router.events])

  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
          <ToastContainer />
          <CssBaseline />

          {loading ? (
            <LoadingScreen />
          ) : //@ts-ignore
          Component.auth ? (
            //@ts-ignore
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}
