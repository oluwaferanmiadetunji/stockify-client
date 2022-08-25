import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import styles from './styles'
import { makeCustomerFilterRequest } from 'utils/api'
import LoadingButton from '@mui/lab/LoadingButton'
import queryString from 'query-string'
import { toast } from 'react-toast'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectCustomerState, cancelFilter } from 'redux-store/customers.slice'
import ClearIcon from '@mui/icons-material/Clear'
import { initialState } from './constant'

export default function FormDialog() {
  const dispatch = useAppDispatch()
  const { isFiltered } = useAppSelector(selectCustomerState)
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [state, setState] = React.useState(initialState)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!state.firstname && !state.lastname && !state.email && !state.phone) {
      toast.error('Filter value not set')
      return
    }

    const query = queryString.stringify(state, {
      skipEmptyString: true,
    })

    const callback = () => {
      setState(initialState)
      handleClose()
    }

    setLoading(true)
    await makeCustomerFilterRequest(
      `limit=1000&sortBy=createdAt:desc&${query}`,
      dispatch,
      callback,
    )

    setLoading(false)
  }

  const onClearFilter = () => {
    dispatch(cancelFilter())
  }

  return (
    <Box>
      {isFiltered ? (
        <Tooltip title="Clear Filter">
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilter}
            sx={{ color: 'white', textTransform: 'unset' }}
          >
            Clear Filter
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Filter Customers">
          <Button
            variant="outlined"
            startIcon={<FilterListIcon sx={styles.filterIcon} />}
            onClick={handleClickOpen}
            sx={{ color: 'white', textTransform: 'unset' }}
          >
            Filter
          </Button>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Filter Customers</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={state.firstname}
          />
          <TextField
            margin="dense"
            name="lastname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={state.lastname}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={state.email}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={state.phone}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>

          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Filter
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
