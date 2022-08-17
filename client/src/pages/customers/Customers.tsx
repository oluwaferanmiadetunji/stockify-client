import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles, { Item, StyledTableCell, StyledTableRow } from './styles'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { generateCustomers } from 'utils/helpers'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'

const Customers = () => {
  const data = generateCustomers()

  return (
    <Layout>
      <Typography
        variant="h5"
        sx={styles.headerText}
        gutterBottom
        component="div"
      >
        Customers
      </Typography>

      <Box sx={styles.container}>
        <Item>
          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>Created</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.phone}</StyledTableCell>
                    <StyledTableCell>
                      {dayjs(row.created).format('MMM D, YYYY')}
                    </StyledTableCell>
                    <StyledTableCell>
                      <DeleteIcon color="error" />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Box>
    </Layout>
  )
}

export default Customers
