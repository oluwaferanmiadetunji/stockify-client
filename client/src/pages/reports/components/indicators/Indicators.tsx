import { useState, useEffect, MouseEvent } from 'react'
import { Item } from './styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from './styles'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ReactApexChart from 'react-apexcharts'
import { areaChartOptions } from './constants'
import { useTheme } from '@mui/material/styles'
import { selectInvoiceState } from 'redux-store/invoice.slice'
import { selectAnalyticsState } from 'redux-store/analytics.slice'
import { useAppSelector, useAppDispatch } from 'redux-store/hooks'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { generateYears, getCurrentYear } from 'utils/helpers'
import { getSalesgraph } from 'api/analytics'

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <Box
            sx={{
              width: '100%',
              float: 'right',
              justifyContent: 'right',
              textAlign: 'right',
            }}
          >
            <Button
              onClick={handleClick}
              sx={{ color: 'white', fontSize: '16px' }}
              endIcon={<KeyboardArrowDownIcon />}
              variant="outlined"
            >
              {year}
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {generateYears().map((item) => (
                <MenuItem
                  key={item}
                  onClick={() => {
                    setYear(item)
                    handleClose()
                  }}
                  sx={{ width: '150px' }}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
