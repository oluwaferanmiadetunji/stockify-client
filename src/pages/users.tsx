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
import { toast } from 'react-toastify'
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

  handleClose = async (id: string) => {
    try {
      await axios.delete(`users/${id}`, {
        headers: {
          //@ts-ignore
          Authorization: `Bearer ${this.props.token}`,
        },
      })

      toast.success('User deleted successfully')
      this.props.navigate.reload()
    } catch (e) {
      toast.error('Error deleting user')
    }
  }

  renderCellData = (key: string, cellData: any) => {
    switch (key) {
      case 'createdAt':
        return dayjs(cellData).format('MMM D, YYYY HH:mm')
      case 'id':
        return (
          <CancelButton
            onClick={() => this.handleClose(cellData)}
            text="Delete"
          />
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

const AddUser = ({
  setUsers,
  users,
  token,
}: {
  setUsers: any
  users: any[]
  token: string
}) => {
  const initialState = { name: '', email: '', password: '' }

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
      const response = await axios.post('users/create', state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success(response.data.message)
      setUsers([response.data.data, ...users])
      setState(initialState)
      handleClose()
    } catch (error) {
      toast.error('Error adding user')
    }

    setLoading(false)
  }

  return (
    <>
      <DarkContainedButton
        text="Add New User"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      />

      <CustomModal header="Add New User" open={open} setOpen={setOpen}>
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
            label="Password"
            name="password"
            value={state.password}
            type="password"
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

const Users = (props: any) => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    setUsers(props.users)
  }, [props.users])

  return (
    <Layout title="Users">
      <Box sx={styles.header}>
        <Typography
          variant="h5"
          sx={styles.headerText}
          gutterBottom
          component="div"
        >
          Users
        </Typography>

        <Stack direction="row" spacing={2}>
          <AddUser setUsers={setUsers} users={users} token={props.token} />
        </Stack>
      </Box>

      <Box sx={styles.container}>
        <Item sx={{ height: 550 }}>
          {users.length > 0 ? (
            <VirtualizedTable
              //@ts-ignore
              rowCount={users.length}
              rowGetter={({ index }: any) => users[index]}
              token={props.token}
              columns={[
                {
                  width: 400,
                  label: 'Name',
                  dataKey: 'name',
                },
                {
                  width: 400,
                  label: 'Email Address',
                  dataKey: 'email',
                },
                {
                  width: 400,
                  label: 'Date',
                  dataKey: 'createdAt',
                },
                {
                  width: 400,
                  label: '',
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

Users.auth = true

export default Users

export const getServerSideProps: GetServerSideProps = async (context) => {
  let users: any[] = []

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
    const response = await axios.get('users/query?limit=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    users = response.data.data.results
  } catch (error) {
    //@ts-ignore
    console.log(error?.response)
  }

  return {
    props: {
      users,
      token,
    },
  }
}
