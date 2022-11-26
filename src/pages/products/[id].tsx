import Layout from 'components/layout'
import Box from '@mui/material/Box'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { ROUTES, ROLES } from 'utils/constant'
import { renderPrice } from 'utils/helpers'
import Typography from '@mui/material/Typography'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Stack from '@mui/material/Stack'
import dayjs from 'dayjs'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { DarkContainedButton, CancelButton } from 'components/buttons'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar'
import { useSession } from 'next-auth/react'

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

  const { data: session } = useSession()

  const user: any = session?.user

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

            {user?.user?.role === ROLES.ADMIN && (
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
            )}
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

ProductInfo.auth = true

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
    //@ts-ignore
    console.log(error?.response)

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
