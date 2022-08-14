import { Link as RouterLink } from 'react-router-dom'
import { Button, Typography, Container, Box } from '@mui/material'
import { ROUTES } from 'utils/constants'
import styles, { ContentStyle } from './styles'

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
              src="/static/img/error.jpg"
              sx={styles.imageContainer}
            />

            <Button
              to={ROUTES.LOGIN}
              size="large"
              variant="contained"
              component={RouterLink}
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
