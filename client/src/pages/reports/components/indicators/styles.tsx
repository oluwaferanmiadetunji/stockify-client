import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const styles = {
  container: {
    padding: '20px',
  },
  header: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  divider: {
    bgcolor: 'rgb(43, 47, 60)',
  },
  card: {
    padding: '15px 20px',
    background: 'rgb(43, 47, 60)',
    borderRadius: '10px',
  },
  cardHeader: {
    fontSize: 12,
    marginBottom: '10px',
    color: 'rgb(151, 161, 186)',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    marginBottom: '10px',
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
