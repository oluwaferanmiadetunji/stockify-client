import { useState, useEffect } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles, { Item } from './styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectCustomerState } from 'redux-store/customers.slice'
import { initialState } from './constant'
import { makeCustomerQueryRequest, makeCreateCustomerRequest } from 'utils/api'

import VirtualizedTable from './MuiVirtualizedTable'

const Customers = () => {
  const dispatch = useAppDispatch()
  const { customers } = useAppSelector(selectCustomerState)

  const [open, setOpen] = useState(false)
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)

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
          Customers
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
        <Item sx={{ height: 500 }}>
          {/* <TableContainer component={Paper} sx={styles.tableContainer}>
            <MuiTable sx={{ minWidth: 700 }} aria-label="customized table">
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
            </MuiTable>
          </TableContainer> */}

          <VirtualizedTable
          //@ts-ignore
            rowCount={customers.length}
            rowGetter={({ index }: any) => customers[index]}
            columns={[
              {
                width: 300,
                label: 'Name',
                dataKey: 'name',
              },
              {
                width: 300,
                label: 'Email Address',
                dataKey: 'email',
              },
              {
                width: 300,
                label: 'Phone Number',
                dataKey: 'phone',
              },
              {
                width: 300,
                label: 'Date',
                dataKey: 'createdAt',
              },
            ]}
          />
        </Item>
      </Box>
    </Layout>
  )
}

export default Customers
