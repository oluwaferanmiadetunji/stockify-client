import Layout from 'components/layout'
import Box from '@mui/material/Box'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { ROUTES, Naira } from 'utils/constant'
import Typography from '@mui/material/Typography'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Stack from '@mui/material/Stack'
import dayjs from 'dayjs'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaymentsIcon from '@mui/icons-material/Payments'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { useState, MouseEvent, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { DarkContainedButton, CancelButton } from 'components/buttons'
import CustomModal from 'components/modal'
import Input from 'components/input'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
    padding: '0 30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  back: {
    color: 'white',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
  },
  menuButton: {
    background: '#344675',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
    color: 'white',
    '&:hover': {
      background: 'rgb(17, 24, 39)',
      color: 'white',
    },
  },
  menuItem: {
    color: 'rgb(151, 161, 186)',
  },
  menuIcon: {
    color: 'rgb(151, 161, 186)',
  },
  content: {
    width: '100%',
    marginTop: '30px',
  },

  headerText: {
    color: 'white',
    fontSize: '26px',
  },
  subHeader: {
    width: '100%',
    marginTop: '40px',
    color: 'rgb(151, 161, 186)',
    fontSize: '12px',
  },
  subHeaderText: {
    color: 'white',
  },
  divider: {
    bgcolor: 'rgb(43, 47, 60)',
  },
  label: {
    color: 'white',
    marginBottom: '10px',
    fontSize: '14px',
  },
  value: {
    color: 'rgb(151, 161, 186)',
    fontSize: '15px',
  },
}

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(17, 24, 39)',
  ...theme.typography.body2,
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
}))

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }: any) => ({
  '& .MuiPaper-root': {
    background: 'rgb(30, 33, 42)',
    borderRadius: 6,
    borderColor: 'white',
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'white',
    width: '200px',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,

        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))

const EditCustomer = ({ data, setData, token }: any) => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState(data)

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

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await axios.patch(`customers/${data.id}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setData(response.data.data)
      toast.success(response.data.message)
      handleClose()
    } catch (error) {
      toast.error('Error updating customer')
    }

    setLoading(false)
  }

  return (
    <>
      <MenuItem onClick={handleClickOpen} disableRipple sx={styles.menuItem}>
        <EditIcon sx={styles.menuIcon} />
        Edit
      </MenuItem>

      <CustomModal header="Edit Customer" open={open} setOpen={setOpen}>
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
            text="Update"
            loading={loading}
            onClick={handleSubmit}
          />
        </Box>
      </CustomModal>
    </>
  )
}

const CustomerInfo = ({ token, customer }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const router = useRouter()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [data, setData] = useState<any>({})
  const [deleteLoading, setDeleteLoading] = useState(false)

  const onDeleteCustomer = async () => {
    setDeleteLoading(true)

    try {
      await axios.delete(`customers/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDeleteLoading(false)
      toast.success('Customer deleted successfully')
      handleClose()
      router.push(ROUTES.CUSTOMERS)
    } catch (error) {
      toast.error('Error deleting customer')
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    setData(customer)
  }, [customer])

  return (
    <Layout title="Customers">
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            component={Link}
            href={ROUTES.CUSTOMERS}
          >
            Customers
          </Button>
        </Box>

        <Box sx={styles.content}>
          <Box sx={styles.header}>
            <Typography sx={styles.headerText}>{data?.name}</Typography>

            <Box>
              <Button
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={styles.menuButton}
              >
                Actions
              </Button>

              <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <EditCustomer data={data} setData={setData} token={token} />

                <MenuItem
                  onClick={onDeleteCustomer}
                  sx={styles.menuItem}
                  disableRipple
                >
                  {deleteLoading ? (
                    'Deleting ...'
                  ) : (
                    <>
                      <DeleteIcon sx={styles.menuIcon} />
                      Delete
                    </>
                  )}
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>

          <Stack direction="row" spacing={4} sx={styles.subHeader}>
            <Stack direction="row" spacing={1}>
              <CalendarMonthIcon />
              <Typography sx={styles.subHeaderText}>
                Since: {dayjs(data?.createdAt).format('MMM D, YYYY HH:mm')}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <ShoppingCartIcon />
              <Typography sx={styles.subHeaderText}>Orders: {0}</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <PaymentsIcon />
              <Typography sx={styles.subHeaderText}>
                Spent: {Naira} 0.00
              </Typography>
            </Stack>
          </Stack>

          <Grid container spacing={3} sx={{ marginTop: '30px' }}>
            <Grid item xs={4}>
              <Item>
                <Box sx={{ padding: '20px' }}>
                  <Typography sx={styles.subHeaderText}>
                    Contact Info
                  </Typography>
                </Box>
                <Divider sx={styles.divider} />

                <Box sx={{ padding: '20px' }}>
                  <Typography sx={styles.label}>Full Name</Typography>

                  <Typography sx={styles.value}>{data?.name}</Typography>
                </Box>

                <Divider sx={styles.divider} />

                <Box sx={{ padding: '20px' }}>
                  <Typography sx={styles.label}>Email Address</Typography>

                  <Typography sx={styles.value}>{data?.email}</Typography>
                </Box>
                <Divider sx={styles.divider} />
                <Box sx={{ padding: '20px' }}>
                  <Typography sx={styles.label}>Phone Number</Typography>

                  <Typography sx={styles.value}>{data?.phone}</Typography>
                </Box>
              </Item>
            </Grid>

            <Grid item xs={8}>
              <Typography sx={styles.subHeaderText}>Latest Orders</Typography>

              <Item sx={{ marginTop: '20px', padding: '20px' }}>
                <Typography sx={styles.value}>No Orders yet</Typography>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  )
}

export default CustomerInfo

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id

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

  let customer = {}

  // @ts-ignore
  const token = session?.accessToken

  try {
    const response = await axios.get(`customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    customer = response.data.data
  } catch (error) {
    console.log(error)

    return {
      redirect: {
        permanent: false,
        destination: ROUTES.CUSTOMERS,
      },
    }
  }
  return {
    props: { id, customer, token },
  }
}
