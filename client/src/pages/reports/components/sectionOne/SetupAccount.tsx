import { Item } from './styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import styles from './styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppSelector } from 'redux-store/hooks'

const SetupAccount = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <Grid item xs={7}>
      <Item sx={{ position: 'relative' }}>
        <Stack sx={styles.setupAccountContainer} direction="row" spacing={2}>
          <Stack sx={{ maxWidth: '45%' }}>
            <Typography sx={styles.setupAccountHeader}>
              Welcome, {user?.name.split(' ')[0]}
            </Typography>

            <Typography sx={styles.setupAccountText}>
              Let’s complete your account information so we can gather more
              accurate data for you.
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
            >
              Go to account{' '}
              <ArrowForwardIcon sx={{ color: 'white', marginLeft: '20px' }} />
            </Button>
          </Stack>

          <Box
            component="img"
            src="/static/svg/welcome.svg"
            sx={styles.imageContainer}
          />
        </Stack>
      </Item>
    </Grid>
  )
}

export default SetupAccount
