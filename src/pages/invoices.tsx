/* eslint-disable @next/next/no-img-element */
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useState, useEffect, PureComponent } from 'react'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { ROUTES } from 'utils/constant'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import EmptyData from 'components/empty'
import { styled, Theme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import queryString from 'query-string'
import { toast } from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear'
import clsx from 'clsx'
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from 'react-virtualized'
import TableCell from '@mui/material/TableCell'
import WithRouter from 'components/withRouter'
import dayjs from 'dayjs'
import { DarkContainedButton, CancelButton } from 'components/buttons'
import CustomModal from 'components/modal'
import Input from 'components/input'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { renderPrice } from 'utils/helpers'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ColumnData {
  dataKey: string
  label: string
  numeric?: boolean
  width: number
  isPrice?: boolean
}

interface Row {
  index: number
}

interface MuiVirtualizedTableProps {
  columns: readonly ColumnData[]
  headerHeight?: number
  onRowClick?: () => void
  rowCount: number
  rowGetter: (row: Row) => Data
  rowHeight?: number
  navigate: any
}

interface Data {
  name: string
  phone: string
  email: string
  createdAt: string
  id: string
}

const styles = {
  container: {
    margin: '40px 0',
    paddingBottom: '40px',
  },
  headerText: {
    color: 'white',
  },
  tableContainer: {
    backgroundColor: 'rgb(30, 33, 42)',
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    cursor: 'pointer',
    '&:hover': {
      color: 'pink',
    },
  },

  filterIcon: {
    color: 'white',
  },
}

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(17, 24, 39)',
  ...theme.typography.body2,
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
  padding: '20px',
}))

const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
  tableColumn: 'ReactVirtualizedDemo-tableColumn',
}

const MuiStyles = ({ theme }: { theme: Theme }) =>
  ({
    '& .ReactVirtualized__Table__headerRow': {
      paddingRight: undefined,
    },
    [`& .${classes.flexContainer}`]: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    [`& .${classes.tableRow}`]: {
      cursor: 'pointer',
    },
    [`& .${classes.tableColumn}`]: {
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.04)',
      },
    },
    [`& .${classes.tableRowHover}`]: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    [`& .${classes.tableCell}`]: {
      flex: 1,
    },
    [`& .${classes.noClick}`]: {
      cursor: 'initial',
    },
  } as const)

class MuiVirtualizedTable extends PureComponent<MuiVirtualizedTableProps> {
  static defaultProps = {
    headerHeight: 50,
    rowHeight: 75,
  }

  getRowClassName = ({ index }: Row) => {
    const { onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, classes.tableColumn, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  }

  getPrice = (items: any[]) => {
    let sum = 0
    for (let i = 0; i < items.length; i++) {
      sum += items[i].sellPrice * items[i].qty
    }

    return `${renderPrice(sum)}`
  }

  renderCellData = (key: string, cellData: any, isPrice = false) => {
    switch (key) {
      case 'createdAt':
        return dayjs(cellData).format('MMM D, YYYY HH:mm')
      case 'dueDate':
        return dayjs(cellData).format('MMM D, YYYY HH:mm')
      case 'items':
        return isPrice ? this.getPrice(cellData) : cellData.length
      case 'isPaid':
        return cellData ? 'Paid' : 'Unpaid'
      case 'customer':
        //@ts-ignore
        const customer = this.props.customers.find(
          (customer: any) => customer.id === cellData,
        )

        return customer?.name
      default:
        return cellData
    }
  }

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }: any) => {
    const { columns, rowHeight, onRowClick } = this.props

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{
          height: rowHeight,
          color:
            columns[columnIndex].dataKey === 'isPaid'
              ? cellData === true
                ? 'green'
                : 'red'
              : 'rgb(151, 161, 186)',
          cursor: 'pointer',
        }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {this.renderCellData(
          columns[columnIndex].dataKey,
          cellData,
          columns[columnIndex].isPrice,
        )}
      </TableCell>
    )
  }

  headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps | (any & { columnIndex: number })) => {
    const { headerHeight, columns } = this.props

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
        )}
        variant="head"
        style={{
          height: headerHeight,
          color: 'white',
          background: 'rgba(255, 255, 255, 0.08)',
        }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{label}</span>
      </TableCell>
    )
  }

  render() {
    const { columns, rowHeight, headerHeight, ...tableProps } = this.props

    return (
      //@ts-ignore
      <AutoSizer>
        {({ height, width }: any) => (
          //@ts-ignore
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight!}
            {...tableProps}
            rowClassName={this.getRowClassName}
            onRowClick={({ rowData }) => {
              const { id } = rowData

              this.props.navigate.push(`${ROUTES.INVOICES}/${id}`)
            }}
          >
            {columns.map(({ dataKey, ...other }, index) => (
              //@ts-ignore
              <Column
                key={dataKey}
                headerRenderer={(headerProps: any) =>
                  this.headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                className={classes.flexContainer}
                cellRenderer={this.cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

const VirtualizedTable: any = styled(WithRouter(MuiVirtualizedTable))(MuiStyles)

const FilterInvoices = ({
  isFiltered,
  setIsFiltered,
  setFilteredInvoices,
  token,
}: {
  isFiltered: boolean
  setIsFiltered: any
  token: string
  setFilteredInvoices: any
}) => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
  }

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(initialState)

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

    if (!state.name && !state.email && !state.phone) {
      toast.error('Filter value not set')
      return
    }

    const query = queryString.stringify(state, {
      skipEmptyString: true,
    })

    setLoading(true)

    try {
      const response = await axios.get(
        `invoices?limit=1000&sortBy=createdAt:desc&${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setIsFiltered(true)
      setFilteredInvoices(response.data.data.results)
    } catch (error) {
      toast.error('Error filtering product')
    }

    handleClose()

    setLoading(false)
  }

  const onClearFilter = () => {
    setIsFiltered(false)
    setState(initialState)
  }

  return (
    <Box>
      {isFiltered && (
        <Tooltip title="Clear Filter">
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilter}
            sx={{
              color: 'red',
              textTransform: 'unset',
              marginRight: '20px',
              '&:hover': {
                color: 'red',
              },
            }}
          >
            Clear Filter
          </Button>
        </Tooltip>
      )}

      <Tooltip title="Filter Invoices">
        <Button
          variant="outlined"
          startIcon={<FilterListIcon sx={styles.filterIcon} />}
          onClick={handleClickOpen}
          sx={{
            color: 'white',
            textTransform: 'unset',
            '&:hover': { color: 'white' },
          }}
        >
          Filter
        </Button>
      </Tooltip>

      <CustomModal header="Filter Invoices" open={open} setOpen={setOpen}>
        <Box
          component="form"
          sx={{
            marginTop: '20px',
          }}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <Input
            handleChange={handleChange}
            label="Name"
            name="name"
            value={state.name}
            autoComplete="name"
            autoFocus
          />

          <Input
            handleChange={handleChange}
            label="Email Address"
            name="email"
            value={state.email}
            autoComplete="email"
          />

          <Input
            handleChange={handleChange}
            label="Phone Number"
            name="phone"
            value={state.phone}
            autoComplete="phone"
          />
        </Box>

        <Box sx={{ float: 'right' }}>
          <CancelButton onClick={handleClose} text="Cancel" />

          <DarkContainedButton
            text="Filter"
            loading={loading}
            onClick={handleSubmit}
          />
        </Box>
      </CustomModal>
    </Box>
  )
}

const Invoices = (props: any) => {
  const [invoices, setInvoices] = useState<any[]>([])
  const [isFiltered, setIsFiltered] = useState(false)

  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([])

  useEffect(() => {
    setInvoices(props.invoices)
  }, [props.invoices])

  const config = {
    seriesBar: [
      {
        name: 'Paid',
        data: [props.report?.totalPaidInvoices],
        color: 'green',
      },
      {
        name: 'Ongoing',
        data: [props.report?.totalUnpaidInvoices],
        color: 'blue',
      },
      {
        name: 'Overdue',
        data: [props.report?.totalOverdueInvoices],
        color: 'yellow',
        label: 'white',
      },
      {
        name: 'Cancelled',
        data: [props.report?.totalCancelledInvoices],
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

  console.log(props.report)

  return (
    <Layout title="Invoices">
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
          {/* <FilterInvoices
            isFiltered={isFiltered}
            setIsFiltered={setIsFiltered}
            setFilteredInvoices={setFilteredInvoices}
            token={props.token}
          /> */}

          <DarkContainedButton
            text="Generate Invoice"
            component={Link}
            href={ROUTES.INVOICES_CREATE}
          />
        </Stack>
      </Box>

      <Item
        sx={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          margin: '30px 0',
        }}
      >
        <Box sx={{ paddingTop: '30px' }}>
          <Typography
            variant="h5"
            sx={{
              color: 'rgb(151, 161, 186)',
              fontSize: 14,
              marginBottom: '15px',
            }}
            gutterBottom
            component="div"
          >
            TOTAL NET INCOME
          </Typography>

          <Typography
            variant="h5"
            sx={{ fontSize: 20, color: 'white', marginBottom: '20px' }}
            gutterBottom
            component="div"
          >
            {props.report?.claimedNetIncome}
          </Typography>

          <Typography
            variant="h5"
            sx={{ color: 'rgb(151, 161, 186)', fontSize: 14 }}
            gutterBottom
            component="div"
          >
            From a total of {props.report?.total}{' '}
            {props.report?.total > 1 ? 'Invoices' : 'Invoice'}
          </Typography>
        </Box>

        <Box>
          {typeof window !== 'undefined' && (
            <ReactApexChart
              //@ts-ignore
              options={config.optionsBar}
              height={100}
              series={config.seriesBar}
              type="bar"
              width={500}
            />
          )}

          <Button
            endIcon={<NavigateNextIcon />}
            sx={{
              textTransform: 'unset',
              color: 'white',
              margin: '0 0 20px 20px',
            }}
            component={Link}
            href={ROUTES.DASHBOARD}
          >
            View Details
          </Button>
        </Box>
      </Item>

      <Box sx={styles.container}>
        <Item sx={{ height: 550 }}>
          {invoices.length > 0 ? (
            <VirtualizedTable
              //@ts-ignore
              rowCount={isFiltered ? filteredInvoices?.length : invoices.length}
              rowGetter={({ index }: any) =>
                isFiltered ? filteredInvoices[index] : invoices[index]
              }
              customers={props.customers}
              columns={[
                {
                  width: 200,
                  label: 'ID',
                  dataKey: 'id',
                },
                {
                  width: 350,
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
                  width: 150,
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
                  dataKey: 'dueDate',
                },
              ]}
            />
          ) : (
            <EmptyData />
          )}
        </Item>
      </Box>
    </Layout>
  )
}

Invoices.auth = true

export default Invoices

export const getServerSideProps: GetServerSideProps = async (context) => {
  let invoices: any[] = []
  let customers: any[] = []
  let report = {}

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  )

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.SIGNIN,
      },
    }
  }

  // @ts-ignore
  const token = session?.accessToken

  try {
    const response = await axios.get('invoices?limit=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    invoices = response.data.data.results

    const res = await axios.get('customers?limit=1000', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    customers = res.data.data.results

    const result = await axios.get('invoices/reports', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    report = result.data.data
  } catch (error) {
    //@ts-ignore
    console.log(error?.response)
  }

  return {
    props: {
      invoices,
      token,
      customers,
      report,
    },
  }
}
