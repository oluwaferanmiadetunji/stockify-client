import Layout from 'components/unauthLayout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ROUTES } from 'utils/constant'
import { isValidToken } from 'utils/helpers'

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
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
    width: '800px',
    height: '500px',
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
  backButton: {
    fontSize: 14,
    height: '45px',
    marginTop: 3,
    marginBottom: '5px',
    textTransform: 'unset',
    fontWeight: 600,
    width: '440px',
  },
  button: {
    color: 'white',
    fontSize: 14,
    background: '#344675',
    height: '45px',
    marginTop: 2,
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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
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

const Signin = () => {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [state, setState] = useState(initialState)
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setLoading(true)
      const response = await axios.post('users', state)
      setLoading(false)
      if (response.status === 201) {
        toast.success(response.data.message)
        setState(initialState)
        router.push(ROUTES.SIGNIN)
      } else {
        toast.error(response.data.message)
      }
    }
  }

  const goBack = () => {
    setState({
      ...state,
    })
    setStep(1)
  }

  const renderButton = () => {
    if (step === 1) {
      return (
        <Button
          fullWidth
          variant="contained"
          sx={styles.button}
          onClick={handleSubmit}
          disabled={!state.email || !state.name}
        >
          Next
        </Button>
      )
    } else {
      return (
        <Fragment>
          <Button
            fullWidth
            variant="contained"
            sx={styles.backButton}
            color="secondary"
            onClick={goBack}
          >
            Back
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={styles.button}
            disabled={loading || !state.confirmPassword || !state.password}
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress sx={{ color: 'white' }} size={25} />
            ) : (
              'Submit'
            )}
          </Button>
        </Fragment>
      )
    }
  }

  useEffect(() => {
    ;(async () => {
      if (status !== 'loading' && session != undefined) {
        //@ts-ignore
        const token = session?.accessToken || ''

        if (isValidToken(token)) {
          router.push(ROUTES.DASHBOARD)
        }
      }
    })()
  }, [router, session, status])

  return (
    <Layout title="Sign In">
      <Box sx={styles.container}>
        <Box sx={styles.card}>
          <Typography sx={styles.header} color="secondary" gutterBottom>
            Create an account
          </Typography>

          <Box component="form" sx={styles.form}>
            {step === 1 && (
              <Fragment>
                <Box sx={styles.formItem}>
                  <FormControl variant="standard">
                    <InputLabel
                      shrink
                      htmlFor="name"
                      sx={styles.textFieldLabel}
                    >
                      Name
                    </InputLabel>

                    <BootstrapInput
                      id="name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      onChange={handleChange}
                      value={state.name}
                      autoFocus
                      required
                      fullWidth
                      size="small"
                    />
                  </FormControl>
                </Box>

                <Box sx={styles.formItem}>
                  <FormControl variant="standard">
                    <InputLabel
                      shrink
                      htmlFor="email"
                      sx={styles.textFieldLabel}
                    >
                      Email Address
                    </InputLabel>

                    <BootstrapInput
                      id="email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      fullWidth
                      onChange={handleChange}
                      value={state.email}
                      size="small"
                    />
                  </FormControl>
                </Box>
              </Fragment>
            )}

            {step === 2 && (
              <Fragment>
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
                      onChange={handleChange}
                      value={state.password}
                      fullWidth
                      size="small"
                    />
                  </FormControl>
                </Box>

                <Box sx={styles.formItem}>
                  <FormControl variant="standard">
                    <InputLabel
                      shrink
                      htmlFor="confirmPassword"
                      sx={styles.textFieldLabel}
                    >
                      Confirm Password
                    </InputLabel>

                    <BootstrapInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      fullWidth
                      onChange={handleChange}
                      value={state.confirmPassword}
                      size="small"
                    />
                  </FormControl>
                </Box>
              </Fragment>
            )}

            {renderButton()}
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Signin
