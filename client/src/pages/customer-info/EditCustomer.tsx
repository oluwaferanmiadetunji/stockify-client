import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAppDispatch } from 'redux-store/hooks'
import {
  makeCustomerQueryRequest,
  makeCreateCustomerRequest,
} from 'api/customers'
import styles from './styles'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'

const EditCustomer = ({ initialState }: any) => {
  const dispatch = useAppDispatch()

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
      await makeCustomerQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )
    })()
  }, [dispatch])

  return (
    <>
      <MenuItem onClick={handleClickOpen} disableRipple sx={styles.menuItem}>
        <EditIcon sx={styles.menuIcon} />
        Edit
      </MenuItem>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
        <DialogTitle>Edit Customer</DialogTitle>
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
              name="firstname"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              value={state.firstname}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="lastname"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={state.lastname}
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
    </>
  )
}

export default EditCustomer
