import { useState, MouseEvent, useEffect } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles, { Item } from './styles'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES, Naira } from 'utils/constants'
import { StyledMenu } from './styled'
import EditCustomer from './EditCustomer'
import { makeSingleCustomerRequest } from 'api/customers'
import queryString from 'query-string'
import BounceLoader from 'react-spinners/BounceLoader'
import Typography from '@mui/material/Typography'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Stack from '@mui/material/Stack'
import dayjs from 'dayjs'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaymentsIcon from '@mui/icons-material/Payments'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

const CustomerInfo = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const parsed: any = queryString.parse(window.location.search)
      setLoading(true)
      const response = await makeSingleCustomerRequest(parsed.id)
      setData(response)
      setLoading(false)
    })()
  }, [])

  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            component={RouterLink}
            to={ROUTES.CUSTOMERS}
          >
            Customers
          </Button>
        </Box>

        {loading ? (
          <Box sx={styles.loaderContainer}>
            <BounceLoader color="white" size={30} />
          </Box>
        ) : (
          <Box sx={styles.content}>
            <Box sx={styles.header}>
              <Typography sx={styles.headerText}>
                {data?.customer?.firstname} {data?.customer?.lastname}
              </Typography>

              <Box>
                <Button
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={styles.menuButton}
                >
                  Actions
                </Button>

                <StyledMenu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <EditCustomer initialState={data?.customer} />

                  <MenuItem
                    onClick={handleClose}
                    sx={styles.menuItem}
                    disableRipple
                  >
                    <DeleteIcon sx={styles.menuIcon} />
                    Delete
                  </MenuItem>
                </StyledMenu>
              </Box>
            </Box>

            <Stack direction="row" spacing={4} sx={styles.subHeader}>
              <Stack direction="row" spacing={1}>
                <CalendarMonthIcon />
                <Typography sx={styles.subHeaderText}>
                  Since:{' '}
                  {dayjs(data?.customer?.createdAt).format('MMM D, YYYY HH:mm')}
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

                    <Typography sx={styles.value}>
                      {data?.customer?.firstname} {data?.customer?.lastname}
                    </Typography>
                  </Box>

                  <Divider sx={styles.divider} />

                  <Box sx={{ padding: '20px' }}>
                    <Typography sx={styles.label}>Email Address</Typography>

                    <Typography sx={styles.value}>
                      {data?.customer?.email}
                    </Typography>
                  </Box>
                  <Divider sx={styles.divider} />
                  <Box sx={{ padding: '20px' }}>
                    <Typography sx={styles.label}>Phone Number</Typography>

                    <Typography sx={styles.value}>
                      {data?.customer?.phone}
                    </Typography>
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
        )}
      </Box>
    </Layout>
  )
}

export default CustomerInfo
