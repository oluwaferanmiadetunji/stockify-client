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
import { makeProductFilterRequest } from 'api/products'
import LoadingButton from '@mui/lab/LoadingButton'
import queryString from 'query-string'
import { toast } from 'react-toast'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import {
  selectProductState,
  cancelProductsFilter,
} from 'redux-store/products.slice'
import ClearIcon from '@mui/icons-material/Clear'
import { initialState } from './constants'

export default function FilterProducts() {
  const dispatch = useAppDispatch()
  const { isFiltered } = useAppSelector(selectProductState)
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

    if (!state.name && !state.color) {
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
    await makeProductFilterRequest(
      `limit=1000&sortBy=createdAt:desc&${query}`,
      dispatch,
      callback,
    )

    setLoading(false)
  }

  const onClearFilter = () => {
    dispatch(cancelProductsFilter())
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
        <Tooltip title="Filter Products">
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
        <DialogTitle>Filter Products</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={state.name}
          />
          <TextField
            margin="dense"
            name="color"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={state.color}
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
