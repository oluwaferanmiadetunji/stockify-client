import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styles, { BootstrapInput } from './styles'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'
import { makeLoginRequest } from 'utils/api'
import { useAppDispatch } from 'redux-store/hooks'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData(event.currentTarget)

    const payload = {
      email: (data.get('email') || '').toString(),
      password: (data.get('password') || '').toString(),
    }

    await makeLoginRequest(payload, dispatch, navigate)

    setLoading(false)
  }

  return (
    <Container disableGutters maxWidth={false} sx={styles.container}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={styles.header}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box sx={styles.formItem}>
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="email" sx={styles.textFieldLabel}>
                Email Address
              </InputLabel>

              <BootstrapInput
                defaultValue=""
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                size="small"
              />
            </FormControl>
          </Box>

          <Box sx={styles.formItem}>
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="password" sx={styles.textFieldLabel}>
                Password
              </InputLabel>

              <BootstrapInput
                defaultValue=""
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                size="small"
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
    </Container>
  )
}
