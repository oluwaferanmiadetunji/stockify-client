import Link from 'next/link'
import { Button, Typography, Container, Box } from '@mui/material'
import { ROUTES } from 'utils/constant'
import { styled } from '@mui/material/styles'

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 0,
    margin: 0,
  },
  content: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'center',
  },
  button: {
    background: '#344675',
    height: '50px',
    color: 'white',
    '&:hover': {
      background: '#222a42',
      color: 'white',
    },
    margin: 'auto',
    width: '200px',
  },
  imageContainer: {
    height: 260,
    mx: 'auto',
    my: { xs: 5, sm: 10 },
  },
}

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

export default function NotFound() {
  return (
    <Box sx={styles.container}>
      <Box>
        <Container>
          <ContentStyle sx={styles.content}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>

            <Typography>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <Box
              component="img"
              src="/img/error.jpg"
              sx={styles.imageContainer}
            />

            <Button
              size="large"
              variant="contained"
              component={Link}
              href={ROUTES.HOME}
              sx={styles.button}
            >
              Go Home
            </Button>
          </ContentStyle>
        </Container>
      </Box>
    </Box>
  )
}
