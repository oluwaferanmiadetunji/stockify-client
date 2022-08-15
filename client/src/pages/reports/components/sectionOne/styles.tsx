import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const styles = {
  topGridItemDetailsHeader: {
    color: 'rgb(151, 161, 186)',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: '10px',
    fontWeight: '600',
  },
  header: {
    padding: '14px 20px',
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
  },
  bottomItem: {
    color: 'rgb(182, 146, 246)',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    padding: '10px 20px',
  },
  divider: {
    bgcolor: 'rgb(43, 47, 60)',
  },
  notifText: {
    color: 'white',
    fontSize: 14,
  },
  setupAccountContainer: {
    padding: '30px',
  },
  setupAccountHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: '30px',
    marginTop: '10px',
  },
  setupAccountText: {
    color: 'white',
    fontSize: 14,
  },
  imageContainer: {
    height: 250,
    mx: 'auto',
    width: '50%',
    paddingLeft: '20px',
  },
  button: {
    color: 'white',
    fontSize: 14,
    background: 'rgb(182, 146, 246)',
    height: '40px',
    marginTop: 3,
    marginBottom: 3,
    textTransform: 'unset',
    '&:hover': {
      background: 'rgb(105, 65, 198)',
    },
    fontWeight: '600',
    position: 'absolute',
    left: '30px',
    bottom: '30px',
    width: '200px',
  },
}

export default styles

export const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(30, 33, 42)',
  ...theme.typography.body2,
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
}))
