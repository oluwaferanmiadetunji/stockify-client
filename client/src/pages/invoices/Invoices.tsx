import { useEffect } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles from './styles'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectInvoiceState } from 'redux-store/invoice.slice'
import { makeInvoicesQueryRequest } from 'api/invoices'
import Button from '@mui/material/Button'
import FilterInvoices from './FilterInvoices'
import VirtualizedTable from './MuiVirtualizedTable'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { Card, Item } from './styled'
import ReactApexChart from 'react-apexcharts'
import { config } from './constant'
import { renderPrice } from 'utils/helpers'

const InvoicesPage = () => {
  const dispatch = useAppDispatch()
  const { filteredInvoices, invoices, isFiltered } = useAppSelector(
    selectInvoiceState,
  )

  useEffect(() => {
    ;(async () => {
      await makeInvoicesQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )
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
            {renderPrice(0)}
          </Typography>

          <Typography
            variant="h5"
            sx={styles.cardCaption}
            gutterBottom
            component="div"
          >
            From a total of 0 Invoices
          </Typography>
        </Box>

        <Box>
          <ReactApexChart
            options={config.options}
            series={config.series}
            type="donut"
          />
        </Box>
      </Card>

      <Box sx={styles.container}>
        <Item sx={{ height: 550 }}>
          <VirtualizedTable
            //@ts-ignore
            rowCount={isFiltered ? filteredInvoices?.length : invoices.length}
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
                width: 300,
                label: 'Number of Items',
                dataKey: 'items',
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
                isPrice: true
              },
            ]}
          />
        </Item>
      </Box>
    </Layout>
  )
}

export default InvoicesPage
