import { useState, useEffect } from 'react'
import { Item } from './styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from './styles'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { formatCurrency } from 'utils/helpers'
import ReactApexChart from 'react-apexcharts'
import { areaChartOptions } from './constants'
import { useTheme } from '@mui/material/styles'

const Indicators = () => {
  const theme: any = useTheme()

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const [options, setOptions] = useState<any>(areaChartOptions)

  const [series] = useState([
    {
      name: 'Series 1',
      data: [58, 115, 28, 83, 63, 75, 35, 55],
    },
  ])

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

  return (
    <Item>
      <Box sx={styles.container}>
        <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
          <Typography sx={styles.header}>Key Performance Indicators</Typography>
        </Stack>

        <Divider sx={styles.divider} />

        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>REVENUE</Typography>
                  <Typography sx={styles.cardText}>
                    {formatCurrency({ amount: 0 })}
                  </Typography>
                </Box>
              </Item>
            </Grid>

            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>NET</Typography>
                  <Typography sx={styles.cardText}>
                    {formatCurrency({ amount: 0 })}
                  </Typography>
                </Box>
              </Item>
            </Grid>

            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>PENDING ORDERS</Typography>
                  <Typography sx={styles.cardText}>
                    {formatCurrency({ amount: 0 })}
                  </Typography>
                </Box>
              </Item>
            </Grid>

            <Grid item xs>
              <Item>
                <Box sx={styles.card}>
                  <Typography sx={styles.cardHeader}>DUE</Typography>
                  <Typography sx={styles.cardText}>
                    {formatCurrency({ amount: 0 })}
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
            type="line"
            height={345}
          />
        </Box>
      </Box>
    </Item>
  )
}

export default Indicators
