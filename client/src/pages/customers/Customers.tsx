import { useState, useEffect } from 'react'
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
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectCustomerState } from 'redux-store/customers.slice'
import { initialState } from './constant'
import {
  makeCustomerQueryRequest,
  makeCreateCustomerRequest,
  makeDeleteCustomerRequest,
} from 'utils/api'

const Customers = () => {
  const dispatch = useAppDispatch()
  const { customers, count } = useAppSelector(selectCustomerState)

  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setLoading(true)
    await makeCreateCustomerRequest(state, dispatch, () => {
      setState(initialState)
      handleClose()
    })

    setLoading(false)
  }

  const onDelete = async () => {
    setLoading(true)
    await makeDeleteCustomerRequest(id, dispatch)
    setDeleteOpen(false)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await makeCustomerQueryRequest('limit=1000', dispatch)
    })()
  }, [dispatch])

  return (
    <Layout>
      <Box sx={styles.header}>
        <Typography
          variant="h5"
          sx={styles.headerText}
          gutterBottom
          component="div"
        >
          Customers ({count})
        </Typography>

        <Button variant="contained" onClick={handleClickOpen}>
          Add New User
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            onSubmit={onSubmit}
            autoComplete="on"
          >
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
              value={state.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={state.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="standard"
              value={state.phone}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>

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
                {customers.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.phone}</StyledTableCell>
                    <StyledTableCell>
                      {dayjs(row.createdAt).format('MMM D, YYYY')}
                    </StyledTableCell>
                    <StyledTableCell>
                      <DeleteIcon
                        color="error"
                        onClick={() => {
                          setId(row.id)
                          setDeleteOpen(true)
                        }}
                        sx={styles.deleteButton}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>{'Delete this customer'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action is irreversible and can not be recovered
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="info" onClick={() => setDeleteOpen(false)}>
                Disagree
              </Button>

              <LoadingButton
                loading={loading}
                onClick={onDelete}
                variant="contained"
                color="error"
                sx={{ marginLeft: '10px' }}
              >
                Delete
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Item>
      </Box>
    </Layout>
  )
}

export default Customers
