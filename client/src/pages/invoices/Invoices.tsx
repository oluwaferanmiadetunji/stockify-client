import { useEffect, useState } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles from './styles'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectInvoiceState } from 'redux-store/invoice.slice'
import { makeInvoicesQueryRequest, getInvoicesReport } from 'api/invoices'
import Button from '@mui/material/Button'
import FilterInvoices from './FilterInvoices'
import VirtualizedTable from './MuiVirtualizedTable'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { Card, Item } from './styled'
import ReactApexChart from 'react-apexcharts'
import { makeCustomerQueryRequest } from 'api/customers'
import CircularProgress from '@mui/material/CircularProgress'
import EmptyData from 'components/empty'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const InvoicesPage = () => {
  const dispatch = useAppDispatch()
  const { filteredInvoices, invoices, isFiltered, report } = useAppSelector(
    selectInvoiceState,
  )

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      await makeCustomerQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )

      await getInvoicesReport(dispatch)

      await makeInvoicesQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )

      setLoading(false)
    })()
  }, [dispatch])

  const renderTable = () => {
    if (loading && invoices.length < 1) {
      return (
        <Box sx={styles.loader}>
          <CircularProgress />
        </Box>
      )
    } else if (invoices.length > 0) {
      return (
        <Item sx={{ height: 550 }}>
          {invoices.length > 0 ? (
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
                  width: 150,
                  label: 'Qty',
                  dataKey: 'items',
                },
                {
                  width: 300,
                  label: 'Price',
                  dataKey: 'items',
                  isPrice: true,
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
              ]}
            />
          ) : (
            <EmptyData />
          )}
        </Item>
      )
    }
  }

  const config = {
    seriesBar: [
      {
        name: 'Paid',
        data: [report?.totalPaidInvoices],
        color: 'green',
      },
      {
        name: 'Ongoing',
        data: [report?.totalUnpaidInvoices],
        color: 'blue',
      },
      {
        name: 'Overdue',
        data: [report?.totalOverdueInvoices],
        color: 'yellow',
        label: 'white',
      },
      {
        name: 'Cancelled',
        data: [report?.totalCancelledInvoices],
        color: 'red',
      },
    ],
    optionsBar: {
      chart: {
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        categories: [''],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        color: 'white',
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.35,
          gradientToColors: undefined,
          inverseColors: false,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [90, 0, 100],
        },
      },

      legend: {
        position: 'bottom',
        horizontalAlign: 'right',
        color: '#fff',
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
    },
    dataLabels: {
      style: {
        colors: ['#F44336', '#E91E63', '#9C27B0'],
      },
    },
    fill: {
      colors: ['#1A73E8', '#B32824'],
    },
  }

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
            {report?.claimedNetIncome}
          </Typography>

          <Typography
            variant="h5"
            sx={styles.cardCaption}
            gutterBottom
            component="div"
          >
            From a total of {report?.totalPaidInvoices}{' '}
            {report?.totalPaidInvoices > 1 ? 'Invoices' : 'Invoice'}
          </Typography>
        </Box>

        <Box>
          <ReactApexChart
            //@ts-ignore
            options={config.optionsBar}
            height={140}
            series={config.seriesBar}
            type="bar"
            width={500}
          />

          <Button
            variant="text"
            endIcon={<NavigateNextIcon />}
            sx={styles.viewMore}
            component={RouterLink}
            to={ROUTES.DASHBOARD_SALES}
          >
            View Details
          </Button>
        </Box>
      </Card>

      <Box sx={styles.container}>{renderTable()}</Box>
    </Layout>
  )
}

export default InvoicesPage
