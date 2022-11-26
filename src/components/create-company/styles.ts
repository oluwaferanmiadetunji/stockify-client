import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const styles = {
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
    textTransform: 'unset',
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(17, 24, 39)',
      color: 'white',
    },
  },
  form: {
    marginTop: '40px',
    width: '600px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  card: {
    height: '500px',
    padding: '30px',
    background: 'rgba(255, 255, 255, .10)',
    textAlign: 'center',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, .25)',
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, .25)',
    backdropFilter: 'blur(15px)',
    overflow: 'auto',
  },
  header: {
    textAlign: 'center',
    margin: 'auto',
    fontSize: '18px',
  },
  uploadArea: {
    width: '530px',
    padding: '10px 15px',
    fontSize: 16,
    height: '100px',
    border: '1px solid #ced4da',
    color: 'white',
    // background: 'white',
    '&:hover': {
      background: 'rgb(160, 174, 192)',
    },
  },
  buttons: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
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
    width: '560px',
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
