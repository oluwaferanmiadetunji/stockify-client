import { ChangeEvent, useEffect } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTES } from 'utils/constants'
import styles from './styles'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import dayjs, { Dayjs } from 'dayjs'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import Divider from '@mui/material/Divider'

import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { makeCustomerQueryRequest } from 'api/customers'
import { makeProductsQueryRequest } from 'api/products'
import { CustomerInfo, Items } from './components'
import {
  selectInvoiceState,
  updateNewInvoiceCreate,
  clearNewInvoice,
} from 'redux-store/invoice.slice'

const Invoice = () => {
  const dispatch = useAppDispatch()
  const { newInvoice } = useAppSelector(selectInvoiceState)

  useEffect(() => {
    ;(async () => {
      await makeCustomerQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )
    })()
  }, [dispatch])

  useEffect(() => {
    ;(async () => {
      await makeProductsQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )
    })()
  }, [dispatch])

  const handleChange = (name: string, value: any | null | undefined) => {
    dispatch(
      updateNewInvoiceCreate({
        [name]: value?.toString() || '',
      }),
    )
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.name, event.target.value)
  }

  const onClear = () => {
    dispatch(clearNewInvoice(null))
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    // console.log(JSON.stringify(newInvoice))
  }

  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            component={RouterLink}
            to={ROUTES.INVOICE}
          >
            Invoices
          </Button>
        </Box>

        <Typography sx={styles.headerText}>Create Invoice</Typography>

        <Box
          component="form"
          sx={styles.formContainer}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                label="Subject"
                variant="outlined"
                size="medium"
                autoFocus
                margin="dense"
                name="subject"
                type="text"
                fullWidth
                required
                sx={styles.halfField}
                InputLabelProps={{
                  style: { color: 'rgb(151, 161, 186)' },
                }}
                value={newInvoice.subject}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Invoice Number"
                variant="outlined"
                size="medium"
                margin="dense"
                name="invoice_number"
                type="text"
                fullWidth
                required
                sx={styles.halfField}
                InputLabelProps={{
                  style: { color: 'rgb(151, 161, 186)' },
                }}
                value={newInvoice.invoice_number}
                disabled
              />
            </Grid>
          </Grid>

          <CustomerInfo />

          <Grid container spacing={4}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Issued Date"
                    inputFormat="MM/DD/YYYY"
                    value={newInvoice.issued_date}
                    disabled
                    onChange={() => {}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        sx={styles.halfField}
                        InputLabelProps={{
                          style: { color: 'rgb(151, 161, 186)' },
                        }}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Due Date"
                    inputFormat="MM/DD/YYYY"
                    value={newInvoice.due_date}
                    onChange={(newValue: Dayjs | null) => {
                      handleChange(
                        'due_date',
                        newValue === null
                          ? dayjs(new Date().setDate(new Date().getDate() + 10))
                          : newValue,
                      )
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        sx={styles.halfField}
                        InputLabelProps={{
                          style: { color: 'rgb(151, 161, 186)' },
                        }}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Divider sx={styles.divider} />

          <Items />

          <Divider sx={{ ...styles.divider, marginBottom: '20px' }} />

          <TextField
            label="Additional Notes"
            variant="outlined"
            size="small"
            margin="dense"
            name="notes"
            type="text"
            fullWidth
            multiline
            rows={4}
            sx={styles.halfField}
            InputLabelProps={{
              style: { color: 'rgb(151, 161, 186)' },
            }}
            value={newInvoice.notes}
            onChange={onChange}
          />

          <Box sx={styles.createButton}>
            <Button
              variant="outlined"
              color="error"
              onClick={onClear}
              sx={{ marginRight: '20px' }}
            >
              Clear
            </Button>

            <Button variant="contained" onClick={handleSubmit} type="submit">
              Create Invoice
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Invoice
