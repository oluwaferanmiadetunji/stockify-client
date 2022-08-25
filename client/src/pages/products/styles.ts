import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const styles = {
  container: {
    marginTop: '40px',
  },
  headerText: {
    color: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    width: '100%',
  },
  card: {
    borderRight: '1px solid rgb(43, 47, 60)',
    padding: '20px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: '13px',
    color: 'rgb(151, 161, 186)',
    marginBottom: '10px',
  },
  cardValue: {
    fontSize: '20px',
  },
  tableContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    background: 'transparent',
  },
  deleteButton: {
    cursor: 'pointer',
    '&:hover': {
      color: 'pink',
    },
  },
}

export default styles

export const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(30, 33, 42)',
  ...theme.typography.body2,
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
  marginBottom: '20px',
}))

export const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(105, 65, 198)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  color: 'rgb(151, 161, 186)',
  //   color: 'white',
}))

export const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))