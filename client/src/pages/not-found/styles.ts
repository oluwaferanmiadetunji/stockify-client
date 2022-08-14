import { styled } from '@mui/material/styles'

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(30, 33, 42)',
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
    background: 'rgb(105, 65, 198)',
    height: '50px',
    '&:hover': {
      background: 'rgb(182, 146, 246)',
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

export default styles

export const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))
