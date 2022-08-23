import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import InventoryIcon from '@mui/icons-material/Inventory'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import styles, { Item } from './styles'
import PaidIcon from '@mui/icons-material/Paid'
import { ROUTES } from 'utils/constants'
import PeopleIcon from '@mui/icons-material/People'
import Grid from '@mui/material/Grid'
import { selectAnalyticsState } from 'redux-store/analytics.slice'
import { useAppSelector } from 'redux-store/hooks'

const ReportOverview = () => {
  const { customer, product } = useAppSelector(selectAnalyticsState)

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
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
                  {customer}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Link to={ROUTES.CUSTOMERS} style={{ textDecoration: 'none' }}>
              <Stack direction="row" spacing={1} sx={styles.bottomGridItem}>
                <Typography>Customers</Typography>
                <ChevronRightIcon />
              </Stack>
            </Link>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <Stack direction="row" spacing={1} sx={styles.topGridItem}>
              <InventoryIcon
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
                  {product}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Link to={ROUTES.PRODUCTS} style={{ textDecoration: 'none' }}>
              <Stack direction="row" spacing={1} sx={styles.bottomGridItem}>
                <Typography>Products</Typography>
                <ChevronRightIcon />
              </Stack>
            </Link>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <Stack direction="row" spacing={1} sx={styles.topGridItem}>
              <PaidIcon
                sx={{
                  ...styles.topGridItemIcon,
                  background: 'rgb(230, 73, 45)',
                }}
              />

              <Box sx={styles.topGridItemDetails}>
                <Typography sx={styles.topGridItemDetailsHeader}>
                  Transactions
                </Typography>
                <Typography sx={styles.topGridItemDetailsValue}>0</Typography>
              </Box>
            </Stack>

            <Divider />

            <Link to={ROUTES.ORDER} style={{ textDecoration: 'none' }}>
              <Stack direction="row" spacing={1} sx={styles.bottomGridItem}>
                <Typography>Transactions</Typography>
                <ChevronRightIcon />
              </Stack>
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ReportOverview
