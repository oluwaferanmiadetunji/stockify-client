import styles from '../styles'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { SingleCustomerState } from 'redux-store/types'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectCustomerState } from 'redux-store/customers.slice'
import {
  selectInvoiceState,
  updateNewInvoiceCreate,
} from 'redux-store/invoice.slice'

const filter = createFilterOptions<SingleCustomerState>()

export default function CustomerInfo() {
  const dispatch = useAppDispatch()
  const { customers } = useAppSelector(selectCustomerState)
  const { newInvoice } = useAppSelector(selectInvoiceState)

  const handleChange = (
    name:
      | 'customer_first_name'
      | 'customer_last_name'
      | 'customer_email'
      | 'customer_phone',
    value: string | null | undefined,
  ) => {
    dispatch(
      updateNewInvoiceCreate({
        [name]: value?.toString() || '',
      }),
    )
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Autocomplete
            value={newInvoice.customer_first_name}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                handleChange('customer_first_name', newValue)
              } else if (newValue && newValue.inputValue) {
                handleChange('customer_first_name', newValue.inputValue)
              } else {
                handleChange('customer_first_name', newValue?.firstname)
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              const { inputValue } = params
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.firstname,
              )
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  firstname: `Add "${inputValue}"`,
                  createdAt: new Date().toISOString(),
                  email: '',
                  id: '',
                  lastname: '',
                  phone: '',
                })
              }

              return filtered
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={customers}
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
              return option.firstname
            }}
            renderOption={(props, option) => (
              <li {...props}>{option.firstname}</li>
            )}
            sx={styles.halfField}
            fullWidth
            freeSolo
            renderInput={(params) => (
              <TextField {...params} required type="text" label="First Name" />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            value={newInvoice.customer_last_name}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                handleChange('customer_last_name', newValue)
              } else if (newValue && newValue.inputValue) {
                handleChange('customer_last_name', newValue.inputValue)
              } else {
                handleChange('customer_last_name', newValue?.lastname)
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              const { inputValue } = params
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.lastname,
              )
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  lastname: `Add "${inputValue}"`,
                  createdAt: new Date().toISOString(),
                  email: '',
                  id: '',
                  firstname: '',
                  phone: '',
                })
              }

              return filtered
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={customers}
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
              return option.lastname
            }}
            renderOption={(props, option) => (
              <li {...props}>{option.lastname}</li>
            )}
            sx={styles.halfField}
            fullWidth
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Last Name" required type="text" />
            )}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Autocomplete
            value={newInvoice.customer_email}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                handleChange('customer_email', newValue)
              } else if (newValue && newValue.inputValue) {
                handleChange('customer_email', newValue.inputValue)
              } else {
                handleChange('customer_email', newValue?.email)
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              const { inputValue } = params
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.email,
              )
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  email: `Add "${inputValue}"`,
                  createdAt: new Date().toISOString(),
                  firstname: '',
                  id: '',
                  lastname: '',
                  phone: '',
                })
              }

              return filtered
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={customers}
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
              return option.email
            }}
            renderOption={(props, option) => <li {...props}>{option.email}</li>}
            sx={styles.halfField}
            fullWidth
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                required
                type="email"
                label="Email Address"
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            value={newInvoice.customer_phone}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                handleChange('customer_phone', newValue)
              } else if (newValue && newValue.inputValue) {
                handleChange('customer_phone', newValue.inputValue)
              } else {
                handleChange('customer_phone', newValue?.phone)
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              const { inputValue } = params
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.phone,
              )
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  phone: `Add "${inputValue}"`,
                  createdAt: new Date().toISOString(),
                  email: '',
                  id: '',
                  firstname: '',
                  lastname: '',
                })
              }

              return filtered
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={customers}
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
              return option.phone
            }}
            renderOption={(props, option) => <li {...props}>{option.phone}</li>}
            sx={styles.halfField}
            fullWidth
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Phone Number" required type="tel" />
            )}
          />
        </Grid>
      </Grid>
    </>
  )
}
