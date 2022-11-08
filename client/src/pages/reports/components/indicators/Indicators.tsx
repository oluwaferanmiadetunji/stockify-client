import { useState, useEffect } from 'react'
import { Item } from './styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from './styles'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import ReactApexChart from 'react-apexcharts'
import { areaChartOptions } from './constants'
import { useTheme } from '@mui/material/styles'
import { selectInvoiceState } from 'redux-store/invoice.slice'
import { selectAnalyticsState } from 'redux-store/analytics.slice'
import { useAppSelector, useAppDispatch } from 'redux-store/hooks'
import { getCurrentYear } from 'utils/helpers'
import { getSalesgraph } from 'api/analytics'
import { Value, Label } from './index'

const Indicators = () => {
  const dispatch = useAppDispatch()
  const theme: any = useTheme()
  const { report } = useAppSelector(selectInvoiceState)
  const { sales } = useAppSelector(selectAnalyticsState)

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const [options, setOptions] = useState<any>(areaChartOptions)

  const series = [
    {
      name: 'Sales',
      data: sales,
    },
  ]

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

  const [year, setYear] = useState(getCurrentYear())

  useEffect(() => {
    ;(async () => {
      await getSalesgraph(year, dispatch)
    })()
  }, [dispatch, year])

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
