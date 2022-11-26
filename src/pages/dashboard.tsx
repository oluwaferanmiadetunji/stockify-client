import Layout from 'components/layout'
import { useSession } from 'next-auth/react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { ROUTES } from 'utils/constant'
import PeopleIcon from '@mui/icons-material/People'
import Grid from '@mui/material/Grid'
import ReceiptIcon from '@mui/icons-material/Receipt'
import greetingTime from 'greeting-time'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { useState, useEffect } from 'react'
import { renderPrice } from 'utils/helpers'
import Indicators from 'components/indicators'

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(17, 24, 39)',
  ...theme.typography.body2,
  padding: '10px 20px',
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
}))

const styles = {
  topGridItem: {
    padding: 0,
    marginBottom: '20px',
    marginTop: '10px',
  },
  topGridItemIcon: {
    marginRight: '15px',
    width: '60px',
    height: '60px',
    background: 'rgb(182, 146, 246)',
    color: 'white',
    borderRadius: '50%',
    padding: '18px',
  },
  topGridItemDetails: {
    marginLeft: '50px',
  },
  topGridItemDetailsHeader: {
    color: 'rgb(151, 161, 186)',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: '10px',
    fontWeight: '600',
  },
  topGridItemDetailsValue: {
    color: '#fff',
    fontSize: 18,
  },
  bottomGridItem: {
    padding: '10px 5px',
    color: 'rgb(182, 146, 246)',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
  },
  bottomText: {
    color: 'rgb(182, 146, 246)',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
  },
  divider: {
    bgcolor: 'white',
    width: '100%',
  },
}

const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: false,
    },
    foreColor: '#fff',
    stacked: true,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000,
      },
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#FCCF31', '#17ead9', '#f02fc2'],
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  grid: {
    strokeDashArray: 4,
    borderColor: '#40475D',
    padding: {
      left: 0,
      right: 0,
    },
  },
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },
  xaxis: {
    axisTicks: {
      color: '#333',
    },
    axisBorder: {
      color: '#333',
    },
    tickPlacement: 'on',
    overwriteCategories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
  },

  tooltip: {
    y: {
      formatter: function (val: any) {
        return renderPrice(val)
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#F55555', '#6078ea', '#6094ea'],
    },
  },
}

const Dashboard = (props: any) => {
  const { data: session, status } = useSession()

  const [reports, setReports] = useState<any>({})

  useEffect(() => {
    setReports(props.reports)
  }, [props.reports])

  return (
    <Layout title="Dashboard">
      <Box sx={{ margin: '50px 0' }}>
        <Box>
          <Typography
            sx={{
              color: 'white',
              fontSize: 30,
              marginBottom: '10px',
              fontWeight: '600',
            }}
          >
            {greetingTime(new Date())}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <Stack direction="row" spacing={1} sx={styles.topGridItem}>
                  <PeopleIcon sx={styles.topGridItemIcon} />

                  <Box sx={styles.topGridItemDetails}>
                    <Typography sx={styles.topGridItemDetailsHeader}>
                      Customers
                    </Typography>
                    <Typography sx={styles.topGridItemDetailsValue}>
                      {reports?.customer}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={styles.divider} />

                <Link
                  href={ROUTES.CUSTOMERS}
                  style={{ textDecoration: 'none' }}
                >
                  <Stack direction="row" spacing={1} sx={styles.bottomGridItem}>
                    <Typography>Customers</Typography>
                    <ChevronRightIcon color="secondary" />
                  </Stack>
                </Link>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item>
                <Stack direction="row" spacing={1} sx={styles.topGridItem}>
                  <ShoppingBagIcon
                    sx={{
                      ...styles.topGridItemIcon,
                      background: 'rgb(56, 178, 73)',
                    }}
                  />

                  <Box sx={styles.topGridItemDetails}>
                    <Typography sx={styles.topGridItemDetailsHeader}>
                      Products
                    </Typography>
                    <Typography sx={styles.topGridItemDetailsValue}>
                      {reports?.product}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={styles.divider} />

                <Link href={ROUTES.PRODUCTS} style={{ textDecoration: 'none' }}>
                  <Stack direction="row" spacing={1} sx={styles.bottomGridItem}>
                    <Typography>Products</Typography>
                    <ChevronRightIcon color="secondary" />
                  </Stack>
                </Link>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item>
                <Stack direction="row" spacing={1} sx={styles.topGridItem}>
                  <ReceiptIcon
                    sx={{
                      ...styles.topGridItemIcon,
                      background: 'rgb(230, 73, 45)',
                    }}
                  />

                  <Box sx={styles.topGridItemDetails}>
                    <Typography sx={styles.topGridItemDetailsHeader}>
                      Invoices
                    </Typography>
                    <Typography sx={styles.topGridItemDetailsValue}>
                      {reports?.invoice}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={styles.divider} />

                <Link href={ROUTES.INVOICES} style={{ textDecoration: 'none' }}>
                  <Stack direction="row" spacing={1} sx={styles.bottomGridItem}>
                    <Typography>Invoices</Typography>
                    <ChevronRightIcon color="secondary" />
                  </Stack>
                </Link>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Indicators token={props.token} />
      </Box>
    </Layout>
  )
}

Dashboard.auth = true

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  let reports = {}

  // @ts-ignore
  const token = session?.accessToken

  try {
    const response = await axios.get('analytics/reports', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    reports = { ...reports, ...response.data?.data }
  } catch (error) {
    //@ts-ignore
    console.log(error?.response)
  }

  return {
    props: {
      token,
      reports,
    },
  }
}

export default Dashboard
