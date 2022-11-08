import { useState, useEffect } from 'react'
import { Item } from './styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from './styles'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import ReactApexChart from 'react-apexcharts'
import { useTheme } from '@mui/material/styles'
import { selectInvoiceState } from 'redux-store/invoice.slice'
import { selectAnalyticsState } from 'redux-store/analytics.slice'
import { useAppSelector, useAppDispatch } from 'redux-store/hooks'
import { getSalesgraph } from 'api/analytics'
import { Value, Label } from './index'
import { renderPriceWithCommas } from 'utils/helpers'

const Indicators = () => {
  const dispatch = useAppDispatch()
  const theme: any = useTheme()
  const { report } = useAppSelector(selectInvoiceState)
  const { sales, salesGraph } = useAppSelector(selectAnalyticsState)

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const series = [
    {
      name: 'Sales',
      data: sales,
    },
  ]

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
      overwriteCategories:
        salesGraph.type.value === 'monthly'
          ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
          : [
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
          return renderPriceWithCommas(val)
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

  const [options, setOptions] = useState<any>(areaChartOptions)

  useEffect(() => {
    setOptions((prevState: any) => ({
      ...prevState,
      colors: [theme.palette.success.main],
      xaxis: {
        labels: {
          style: {
            colors: [
              'white',
              'white',
              'white',
              'white',
              'white',
              'white',
              'white',
              'white',
              'white',
              'white',
              'white',
              'white',
            ],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: 'light',
      },
      legend: {
        labels: {
          colors: 'grey.500',
        },
      },
    }))
  }, [primary, secondary, line, theme])

  useEffect(() => {
    ;(async () => {
      await getSalesgraph(2022, dispatch)
    })()
  }, [dispatch])

  return (
    <Item>
      <Box sx={styles.container}>
        <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
          <Typography sx={styles.header}>Key Performance Indicators</Typography>
        </Stack>

        <Divider sx={styles.divider} />

        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: '100%',
              float: 'right',
              justifyContent: 'right',
              textAlign: 'right',
            }}
          >
            <Label />

            <Value />
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>REVENUE</Typography>
                  <Typography sx={styles.cardText}>
                    {report?.claimedNetIncome}
                  </Typography>
                </Box>
              </Item>
            </Grid>

            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>NET</Typography>
                  <Typography sx={styles.cardText}>
                    {report?.claimedNetIncome}
                  </Typography>
                </Box>
              </Item>
            </Grid>

            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>PENDING ORDERS</Typography>
                  <Typography sx={styles.cardText}>
                    {report?.unclaimedNetIncome}
                  </Typography>
                </Box>
              </Item>
            </Grid>

            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>DUE</Typography>
                  <Typography sx={styles.cardText}>
                    {report?.unclaimedNetIncome}
                  </Typography>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={345}
          />
        </Box>
      </Box>
    </Item>
  )
}

export default Indicators
