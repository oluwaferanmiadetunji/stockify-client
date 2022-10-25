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
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { SingleProductInterface } from 'redux-store/types'
import _ from 'lodash'

const filter = createFilterOptions<SingleProductInterface>()

export default function FilterProducts() {
  const dispatch = useAppDispatch()
  const { isFiltered, products } = useAppSelector(selectProductState)
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

    if (!state.name && !state.color && !state.category) {
      toast.error('Filter value not set')
      return
    }

    const query = queryString.stringify(state, {
      skipEmptyString: true,
    })

    const callback = () => {
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
      {isFiltered && (
        <Tooltip title="Clear Filter">
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilter}
            color="error"
            sx={{ textTransform: 'unset', marginRight: '15px' }}
          >
            Clear Filter
          </Button>
        </Tooltip>
      )}

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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Filter Products</DialogTitle>
        <DialogContent>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={products}
            value={state.name}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setState({
                  ...state,
                  name: newValue,
                })
              } else if (newValue && newValue.inputValue) {
                setState({
                  ...state,
                  name: newValue.inputValue,
                })
              } else {
                setState({
                  ...state,
                  name: newValue?.name || '',
                })
              }
            }}
            filterOptions={(options, params) => filter(options, params)}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue
              }
              // Regular option
              return option.name
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            fullWidth
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product Name"
                autoFocus
                margin="dense"
                name="name"
                type="text"
                fullWidth
                required
                variant="standard"
              />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={_.uniqBy(products, 'category')}
            value={state.category}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setState({
                  ...state,
                  category: newValue,
                })
              } else if (newValue && newValue.inputValue) {
                setState({
                  ...state,
                  category: newValue.inputValue,
                })
              } else {
                setState({
                  ...state,
                  category: newValue?.category || '',
                })
              }
            }}
            filterOptions={(options, params) => filter(options, params)}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue
              }
              // Regular option
              return option.category
            }}
            renderOption={(props, option) => (
              <li {...props}>{option.category}</li>
            )}
            fullWidth
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product Category"
                margin="dense"
                name="category"
                type="text"
                fullWidth
                required
                variant="standard"
              />
            )}
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
