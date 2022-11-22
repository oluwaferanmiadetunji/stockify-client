import Layout from 'components/unauthLayout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { signIn, getCsrfToken, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { ROUTES } from 'utils/constant'
import { isValidToken } from 'utils/helpers'
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const initialState = {
  email: '',
  password: '',
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  card: {
    width: '750px',
    height: '450px',
    padding: '30px',
    background: 'rgba(255, 255, 255, .10)',
    textAlign: 'center',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, .25)',
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, .25)',
    backdropFilter: 'blur(15px)',
  },
  header: {
    fontSize: '20px',
    margin: '10px auto',
  },
  formItem: {
    marginBottom: '20px',
  },
  textFieldLabel: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    color: 'white',
    fontSize: 14,
    background: '#344675',
    height: '45px',
    marginTop: 3,
    marginBottom: 3,
    textTransform: 'unset',
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(17, 24, 39)',
      color: 'white',
    },
    width: '440px',
  },

  form: {
    marginTop: '40px',
  },
}

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    color: '#fff',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'transparent',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '400px',
    padding: '10px 15px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: 'rgb(105, 65, 198)',
    },
  },
}))

const Signin = ({ csrfToken }: any) => {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(initialState)
  const Router = useRouter()
  const { data: session, status } = useSession()

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      email: state.email,
      password: state.password,
      callbackUrl: `${window.location.origin}${ROUTES.DASHBOARD}`,
    })
    setLoading(false)
    if (res?.error) {
      toast.error('Wrong crendentials')
    }
    //@ts-ignore
    if (res.url) Router.push(res.url)
  }

  useEffect(() => {
    ;(async () => {
      if (status !== 'loading' && session != undefined) {
        //@ts-ignore
        const token = session?.accessToken || ''

        if (isValidToken(token)) {
          Router.push(ROUTES.DASHBOARD)
        }
      }
    })()
  }, [Router, session, status])

  return (
    <Layout title="Sign In">
      <Box sx={styles.container}>
        <Box sx={styles.card}>
          <Typography sx={styles.header} color="secondary" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <Box sx={styles.formItem}>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="email" sx={styles.textFieldLabel}>
                  Email Address
                </InputLabel>

                <BootstrapInput
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  value={state.email}
                />
              </FormControl>
            </Box>

            <Box sx={styles.formItem}>
              <FormControl variant="standard">
                <InputLabel
                  shrink
                  htmlFor="password"
                  sx={styles.textFieldLabel}
                >
                  Password
                </InputLabel>

                <BootstrapInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  value={state.password}
                />
              </FormControl>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress sx={{ color: 'white' }} size={25} />
              ) : (
                'Log In'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Signin

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
