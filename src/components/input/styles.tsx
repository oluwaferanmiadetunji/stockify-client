import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const styles = {
  formItem: {
    marginBottom: '30px',
  },
  textFieldLabel: {
    color: '#fff',
    fontSize: 16,
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
    width: '500px',
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
