import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  back: {
    color: 'rgb(182, 146, 246)',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
  },
  menuButton: {
    background: 'rgb(182, 146, 246)',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
    color: 'white',
  },
  menuItem: {
    color: 'rgb(151, 161, 186)',
  },
  menuIcon: {
    color: 'rgb(151, 161, 186)',
  },
  content: {
    width: '100%',
    marginTop: '30px',
  },
  loaderContainer: {
    height: 400,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: '26px',
  },
  subHeader: {
    width: '100%',
    marginTop: '40px',
    color: 'rgb(151, 161, 186)',
    fontSize: '12px',
  },
  subHeaderText: {
    color: 'white',
  },
  divider: {
    bgcolor: 'rgb(43, 47, 60)',
  },
  label: {
    color: 'white',
    marginBottom: '10px',
    fontSize: '14px',
  },
  value: {
    color: 'rgb(151, 161, 186)',
    fontSize: '15px',
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
