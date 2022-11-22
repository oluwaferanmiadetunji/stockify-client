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
import AddIcon from '@mui/icons-material/Add'
import { DarkContainedButton, CancelButton } from 'components/buttons'
import CustomModal from 'components/modal'
import Input from 'components/input'

interface ColumnData {
  dataKey: string
  label: string
  numeric?: boolean
  width: number
}

interface Row {
  index: number
}

interface CustomerInterface {
  email: string
  name: string
  phone: string
  createdAt: string
  id: string
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
    marginTop: '40px',
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
          color: 'rgb(151, 161, 186)',
          cursor: 'pointer',
        }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {columns[columnIndex].dataKey === 'createdAt'
          ? dayjs(cellData).format('MMM D, YYYY HH:mm')
          : cellData}
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
        <span>{label.toUpperCase()}</span>
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

              this.props.navigate.push(`${ROUTES.CUSTOMERS}/${id}`)
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

const FilterCustomers = ({
  isFiltered,
  setIsFiltered,
  setFilteredCustomers,
  token,
}: {
  isFiltered: boolean
  setIsFiltered: any
  token: string
  setFilteredCustomers: any
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
        `customers?limit=1000&sortBy=createdAt:desc&${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setIsFiltered(true)
      setFilteredCustomers(response.data.data.results)
    } catch (error) {
      toast.error('Error filtering customer')
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

      <Tooltip title="Filter Customers">
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

      <CustomModal header="Filter Customer" open={open} setOpen={setOpen}>
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

const AddCustomer = ({
  setCustomers,
  customers,
  token,
}: {
  setCustomers: any
  customers: CustomerInterface[]
  token: string
}) => {
  const initialState = { name: '', email: '', phone: '' }

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

    try {
      const response = await axios.post('customers', state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success(response.data.message)
      setCustomers([response.data.data, ...customers])
      setState(initialState)
      handleClose()
    } catch (error) {
      toast.error('Error adding customer')
    }

    setLoading(false)
  }

  return (
    <>
      <DarkContainedButton
        text="Add New Customer"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      />

      <CustomModal header="Add New Customer" open={open} setOpen={setOpen}>
        <Box
          component="form"
          sx={{
            marginTop: '20px',
          }}
          onSubmit={onSubmit}
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
            text="Submit"
            loading={loading}
            onClick={onSubmit}
          />
        </Box>
      </CustomModal>
    </>
  )
}

const Customers = (props: any) => {
  const [customers, setCustomers] = useState<CustomerInterface[]>([])
  const [isFiltered, setIsFiltered] = useState(false)

  const [filteredCustomers, setFilteredCustomers] = useState<
    CustomerInterface[]
  >([])

  useEffect(() => {
    setCustomers(props.customers)
  }, [props.customers])

  return (
    <Layout title="Customers">
      <Box sx={styles.header}>
        <Typography
          variant="h5"
          sx={styles.headerText}
          gutterBottom
          component="div"
        >
          Customers
        </Typography>

        <Stack direction="row" spacing={2}>
          <FilterCustomers
            isFiltered={isFiltered}
            setIsFiltered={setIsFiltered}
            setFilteredCustomers={setFilteredCustomers}
            token={props.token}
          />

          <AddCustomer
            setCustomers={setCustomers}
            customers={customers}
            token={props.token}
          />
        </Stack>
      </Box>

      <Box sx={styles.container}>
        <Item sx={{ height: 550 }}>
          {customers.length > 0 ? (
            <VirtualizedTable
              //@ts-ignore
              rowCount={
                isFiltered ? filteredCustomers?.length : customers.length
              }
              rowGetter={({ index }: any) =>
                isFiltered ? filteredCustomers[index] : customers[index]
              }
              columns={[
                {
                  width: 300,
                  label: 'Name',
                  dataKey: 'name',
                },
                {
                  width: 300,
                  label: 'Email Address',
                  dataKey: 'email',
                },
                {
                  width: 300,
                  label: 'Phone Number',
                  dataKey: 'phone',
                },
                {
                  width: 300,
                  label: 'Date',
                  dataKey: 'createdAt',
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

Customers.auth = true

export default Customers

export const getServerSideProps: GetServerSideProps = async (context) => {
  let customers: CustomerInterface[] = []

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
    const response = await axios.get('customers?limit=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    customers = response.data.data.results
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      customers,
      token,
    },
  }
}
