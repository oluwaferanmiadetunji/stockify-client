import { useEffect, useState } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles from './styles'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectInvoiceState } from 'redux-store/invoice.slice'
import { selectCustomerState } from 'redux-store/customers.slice'
import { makeInvoicesQueryRequest } from 'api/invoices'
import Button from '@mui/material/Button'
import FilterInvoices from './FilterInvoices'
import VirtualizedTable from './MuiVirtualizedTable'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { Card, Item } from './styled'
// import ReactApexChart from 'react-apexcharts'
// import { config } from './constant'
import { renderPriceWithCommas } from 'utils/helpers'
import { makeCustomerQueryRequest } from 'api/customers'
import CircularProgress from '@mui/material/CircularProgress'
import { selectAnalyticsState } from 'redux-store/analytics.slice'
import { getTotalSum } from './utils'
import EmptyData from 'components/empty'

const InvoicesPage = () => {
  const dispatch = useAppDispatch()
  const { filteredInvoices, invoices, isFiltered } = useAppSelector(
    selectInvoiceState,
  )
  const { customers } = useAppSelector(selectCustomerState)
  const [loading, setLoading] = useState(false)

  const { invoice } = useAppSelector(selectAnalyticsState)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      await makeCustomerQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )

      await makeInvoicesQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )

      setLoading(false)
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
          Invoices
        </Typography>

        <Stack direction="row" spacing={2}>
          <FilterInvoices />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ color: 'white', textTransform: 'unset' }}
            component={RouterLink}
            to={ROUTES.INVOICE_CREATE}
          >
            Add Invoice
          </Button>
        </Stack>
      </Box>

      <Card>
        <Box>
          <Typography
            variant="h5"
            sx={styles.cardLabel}
            gutterBottom
            component="div"
          >
            TOTAL NET INCOME
          </Typography>

          <Typography
            variant="h5"
            sx={styles.cardValue}
            gutterBottom
            component="div"
          >
            {renderPriceWithCommas(getTotalSum(invoices))}
          </Typography>

          <Typography
            variant="h5"
            sx={styles.cardCaption}
            gutterBottom
            component="div"
          >
            From a total of {invoice}{' '}
            {invoices.length > 1 ? 'Invoices' : 'Invoice'}
          </Typography>
        </Box>

        {/* <Box>
          <ReactApexChart
            options={config.options}
            series={config.series}
            type="donut"
          />
        </Box> */}
      </Card>

      <Box sx={styles.container}>
        {loading && !invoices && !customers ? (
          <Box sx={styles.loader}>
            <CircularProgress />
          </Box>
        ) : (
          <Item sx={{ height: 550 }}>
            {invoices.length > 0 ? (
              <VirtualizedTable
                //@ts-ignore
                rowCount={
                  isFiltered ? filteredInvoices?.length : invoices.length
                }
                rowGetter={({ index }: any) =>
                  isFiltered ? filteredInvoices[index] : invoices[index]
                }
                columns={[
                  {
                    width: 300,
                    label: 'Order ID',
                    dataKey: 'invoice_number',
                  },
                  {
                    width: 300,
                    label: 'Customer',
                    dataKey: 'customer',
                  },
                  {
                    width: 150,
                    label: 'Qty',
                    dataKey: 'items',
                  },
                  {
                    width: 200,
                    label: 'Status',
                    dataKey: 'isPaid',
                  },
                  {
                    width: 300,
                    label: 'Invoice Date',
                    dataKey: 'createdAt',
                  },
                  {
                    width: 300,
                    label: 'Due Date',
                    dataKey: 'due_date',
                  },
                  {
                    width: 300,
                    label: 'Price',
                    dataKey: 'items',
                    isPrice: true,
                  },
                ]}
              />
            ) : (
              <EmptyData />
            )}
          </Item>
        )}
      </Box>
    </Layout>
  )
}

export default InvoicesPage
