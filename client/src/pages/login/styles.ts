import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

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
  header: {
    color: 'white',
  },
  button: {
    color: 'white',
    fontSize: 14,
    background: 'rgb(182, 146, 246)',
    height: '45px',
    marginTop: 3,
    marginBottom: 3,
    textTransform: 'unset',
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(105, 65, 198)',
    },
  },

  textFieldLabel: {
    color: '#fff',
    fontSize: 16,
  },

  formItem: {
    marginBottom: '20px',
  },
}

export default styles

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
