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
import Avatar from '@mui/material/Avatar'
import { renderPrice } from 'utils/helpers'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'

interface ColumnData {
  dataKey: string
  label: string
  numeric?: boolean
  width: number
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

const GreenBorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgb(10, 92, 83)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'rgb(20, 184, 166)',
  },
}))

const RedBorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgb(104, 33, 33)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'rgb(209, 67, 67)',
  },
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

  renderCellData = (dataKey: string, cellData: string | number) => {
    switch (dataKey) {
      case 'createdAt':
        return dayjs(cellData).format('MMM D, YYYY HH:mm')
      case 'sellPrice':
        return renderPrice(cellData)
      case 'image':
        return <Avatar src={String(cellData)} variant="square" />
      case 'qty':
        return (
          <Box sx={{ width: '100%' }}>
            {Number(cellData) > 15 ? (
              <GreenBorderLinearProgress
                variant="determinate"
                sx={{ marginBottom: '10px' }}
                value={Number(cellData) > 100 ? 100 : Number(cellData)}
              />
            ) : (
              <RedBorderLinearProgress
                variant="determinate"
                sx={{ marginBottom: '10px' }}
                value={Number(cellData)}
              />
            )}
            <Typography variant="body2" sx={{}}>
              {cellData} in stock
            </Typography>
          </Box>
        )
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
          color: 'rgb(151, 161, 186)',
          cursor: 'pointer',
        }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {this.renderCellData(columns[columnIndex].dataKey, cellData)}
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

              this.props.navigate.push(`${ROUTES.PRODUCTS}/${id}`)
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

const FilterProducts = ({
  isFiltered,
  setIsFiltered,
  setFilteredProducts,
  token,
}: {
  isFiltered: boolean
  setIsFiltered: any
  token: string
  setFilteredProducts: any
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
        `products?limit=1000&sortBy=createdAt:desc&${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setIsFiltered(true)
      setFilteredProducts(response.data.data.results)
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

      <Tooltip title="Filter Products">
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

      <CustomModal header="Filter Products" open={open} setOpen={setOpen}>
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

const Products = (props: any) => {
  const [products, setProducts] = useState<any[]>([])
  const [isFiltered, setIsFiltered] = useState(false)

  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  return (
    <Layout title="Products">
      <Box sx={styles.header}>
        <Typography
          variant="h5"
          sx={styles.headerText}
          gutterBottom
          component="div"
        >
          Products
        </Typography>

        <Stack direction="row" spacing={2}>
          <FilterProducts
            isFiltered={isFiltered}
            setIsFiltered={setIsFiltered}
            setFilteredProducts={setFilteredProducts}
            token={props.token}
          />

          <DarkContainedButton
            text="Add New Product"
            component={Link}
            href={ROUTES.PRODUCTS_CREATE}
          />
        </Stack>
      </Box>

      <Grid container spacing={0} sx={{ margin: '20px 0', width: '100%' }}>
        <Grid item xs={4}>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              display: 'flex',
              background: 'rgb(17, 24, 39)',
              justifyContent: 'space-between',
              width: '95%',
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ marginBottom: '10px', color: 'rgb(20, 184, 166)' }}
              >
                {products.length}
              </Typography>

              <Typography variant="body1">In stock</Typography>
            </Box>

            <ShoppingCartIcon
              fontSize="large"
              sx={{ color: 'rgb(20, 184, 166)' }}
            />
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              display: 'flex',
              background: 'rgb(17, 24, 39)',
              justifyContent: 'space-between',
              width: '95%',
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ marginBottom: '10px', color: 'rgb(209, 67, 67)' }}
              >
                0
              </Typography>

              <Typography variant="body1">Stock Out</Typography>
            </Box>

            <RemoveShoppingCartIcon
              fontSize="large"
              sx={{ color: 'rgb(209, 67, 67)' }}
            />
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              display: 'flex',
              background: 'rgb(17, 24, 39)',
              justifyContent: 'space-between',
              width: '95%',
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ marginBottom: '10px', color: 'white' }}
              >
                {products.length}
              </Typography>

              <Typography variant="body1">Total</Typography>
            </Box>

            <ShoppingBagIcon fontSize="large" sx={{ color: 'white' }} />
          </Card>
        </Grid>
      </Grid>

      <Box sx={styles.container}>
        <Item sx={{ height: 550 }}>
          {products.length > 0 ? (
            <VirtualizedTable
              //@ts-ignore
              rowCount={isFiltered ? filteredProducts?.length : products.length}
              rowGetter={({ index }: any) =>
                isFiltered ? filteredProducts[index] : products[index]
              }
              columns={[
                {
                  width: 100,
                  label: '',
                  dataKey: 'image',
                },
                {
                  width: 300,
                  label: 'Product',
                  dataKey: 'name',
                },
                {
                  width: 300,
                  label: 'Stock',
                  dataKey: 'qty',
                },
                {
                  width: 300,
                  label: 'Category',
                  dataKey: 'category',
                },
                {
                  width: 300,
                  label: 'Price',
                  dataKey: 'sellPrice',
                },
                {
                  width: 300,
                  label: 'Product ID',
                  dataKey: 'id',
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

Products.auth = true

export default Products

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products: any[] = []

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
    const response = await axios.get('products?limit=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    products = response.data.data.results
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      products,
      token,
    },
  }
}
