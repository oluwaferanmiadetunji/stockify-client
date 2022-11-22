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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { ROUTES } from 'utils/constant'
import { renderPrice } from 'utils/helpers'
import Typography from '@mui/material/Typography'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Stack from '@mui/material/Stack'
import dayjs from 'dayjs'
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
import Avatar from '@mui/material/Avatar'

const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
    padding: '0 30px',
    paddingBottom: '20px',
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
    color: 'white',
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
    bgcolor: 'white',
    width: '100%',
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

const EditProduct = ({ data, setData, token }: any) => {
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

const ProductInfo = ({ token, product }: any) => {
  const router = useRouter()

  const [data, setData] = useState<any>({})
  const [deleteLoading, setDeleteLoading] = useState(false)

  const onDeleteCustomer = async () => {
    setDeleteLoading(true)

    try {
      await axios.delete(`products/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setDeleteLoading(false)
      toast.success('Product deleted successfully')

      router.push(ROUTES.PRODUCTS)
    } catch (error) {
      toast.error('Error deleting product')
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    setData(product)
  }, [product])

  return (
    <Layout title="Customers">
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            component={Link}
            href={ROUTES.PRODUCTS}
          >
            Products
          </Button>
        </Box>

        <Box sx={styles.content}>
          <Box sx={styles.header}>
            <Typography sx={styles.headerText}>{data?.name}</Typography>

            <Box sx={{ display: 'flex' }}>
              <DarkContainedButton
                component={Link}
                href={`${ROUTES.PRODUCTS}/${data?.id}/edit`}
                text="Edit"
                startIcon={<EditIcon color="inherit" />}
                styles={{ marginRight: '20px' }}
              />

              <CancelButton
                onClick={onDeleteCustomer}
                loading={deleteLoading}
                text="Delete Product"
              />
            </Box>
          </Box>

          <Stack direction="row" spacing={4} sx={styles.subHeader}>
            <Stack direction="row" spacing={1}>
              <CalendarMonthIcon fontSize="small" />
              <Typography sx={styles.subHeaderText} variant="body2">
                Created On: {dayjs(data?.createdAt).format('MMM D, YYYY HH:mm')}
              </Typography>
            </Stack>
          </Stack>

          <Item sx={{ marginTop: '30px', marginBottom: '30px' }}>
            <Box sx={{ padding: '20px', width: '100%' }}>
              <Typography
                sx={{
                  ...styles.subHeaderText,
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                Product Details
              </Typography>
            </Box>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Product Name</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.name}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Product ID</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.id}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Product Image</Typography>
              </Grid>

              <Grid item xs={8}>
                <Avatar src={String(data?.image)} variant="square" />
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Product Description</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.description}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Cost Price</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>
                  {renderPrice(data?.buyPrice)}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Selling Price</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>
                  {renderPrice(data?.sellPrice)}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Category</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.category}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Quantity</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.qty}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Supplier</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.supplier}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Manufacturer</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.manufacturer}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Serial Number</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.serialNumber}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>RAM</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.RAM}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>ROM</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.ROM}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Processor Type</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.processorType}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Size</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.size}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>IMEI Number</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.imei}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Battery Health</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>{data?.batteryHealth}</Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>
                  Is Fingerprint Enabled?
                </Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>
                  {data?.isFingerPrint === true ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Is Touch Enabled?</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>
                  {data?.isTouch === true ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            <Grid container spacing={2} sx={{ padding: '20px' }}>
              <Grid item xs={4}>
                <Typography sx={styles.label}>Dedicated Memory?</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={styles.value}>
                  {data?.dedicatedMemory === true ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Box>
      </Box>
    </Layout>
  )
}

export default ProductInfo

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

  let product = {}

  // @ts-ignore
  const token = session?.accessToken

  try {
    const response = await axios.get(`products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    product = response.data.data
  } catch (error) {
    console.log(error)

    return {
      redirect: {
        permanent: false,
        destination: ROUTES.PRODUCTS,
      },
    }
  }
  
  return {
    props: { id, product, token },
  }
}
