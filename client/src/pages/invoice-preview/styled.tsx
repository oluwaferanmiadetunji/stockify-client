import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgb(30, 33, 42)',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: '20px',
  marginTop: '40px',
}))
