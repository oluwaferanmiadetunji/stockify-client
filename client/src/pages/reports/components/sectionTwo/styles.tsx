import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const styles = {
  topGridItem: {
    padding: 0,
    marginBottom: '20px',
    marginTop: '10px',
  },
  topGridItemIcon: {
    marginRight: '15px',
    width: '60px',
    height: '60px',
    background: 'rgb(182, 146, 246)',
    color: 'white',
    borderRadius: '50%',
    padding: '18px',
  },
  topGridItemDetails: {
    marginLeft: '50px',
  },
  topGridItemDetailsHeader: {
    color: 'rgb(151, 161, 186)',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: '10px',
    fontWeight: '600',
  },
  topGridItemDetailsValue: {
    color: '#fff',
    fontSize: 18,
  },
  bottomGridItem: {
    padding: '10px 5px',
    color: 'rgb(182, 146, 246)',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
  },
  bottomText: {
    color: 'rgb(182, 146, 246)',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
  },
}

export default styles

export const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(30, 33, 42)',
  ...theme.typography.body2,
  padding: '10px 20px',
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
}))
