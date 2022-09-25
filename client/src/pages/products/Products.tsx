import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import Layout from 'components/layout'
import Typography from '@mui/material/Typography'
import InventoryIcon from '@mui/icons-material/Inventory'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaidIcon from '@mui/icons-material/Paid'
import styles, { Item, StyledTableCell, StyledTableRow } from './styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import dayjs from 'dayjs'
import { selectProductState } from 'redux-store/products.slice'
import { selectAnalyticsState } from 'redux-store/analytics.slice'
import { makeProductsQueryRequest } from 'api/products'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { renderPriceWithCommas, getTotalProductCount } from 'utils/helpers'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { ROUTES } from 'utils/constants'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import FilterProducts from './FilterProducts'
import Stack from '@mui/material/Stack'
import EmptyData from 'components/empty'

const Products = () => {
  const dispatch = useAppDispatch()
  const { products, totalPrice, isFiltered, filteredProducts } = useAppSelector(
    selectProductState,
  )
  const { product: count } = useAppSelector(selectAnalyticsState)

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      await makeProductsQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )
    })()
  }, [dispatch])

  const allProducts = isFiltered ? filteredProducts : products

  return (
    <Layout>
      <Box sx={styles.header}>
        <Typography
          variant="h5"
          sx={styles.headerText}
          gutterBottom
          component="div"
        >
          Products
        </Typography>

        <Stack direction="row" spacing={2}>
          <FilterProducts />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ color: 'white', textTransform: 'unset' }}
            component={RouterLink}
            to={ROUTES.PRODUCTS_CREATE}
          >
            Add New Product
          </Button>
        </Stack>
      </Box>

      <Box sx={styles.container}>
        <Item
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={styles.card}>
            <InventoryIcon />

            <Box sx={{ marginLeft: '30px' }}>
              <Typography
                variant="h5"
                sx={styles.cardLabel}
                gutterBottom
                component="div"
              >
                TOTAL PRODUCTS
              </Typography>

              <Typography
                variant="h5"
                sx={styles.cardValue}
                gutterBottom
                component="div"
              >
                {count}
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.card}>
            <InventoryIcon />

            <Box sx={{ marginLeft: '30px' }}>
              <Typography
                variant="h5"
                sx={styles.cardLabel}
                gutterBottom
                component="div"
              >
                TOTAL STOCK
              </Typography>

              <Typography
                variant="h5"
                sx={styles.cardValue}
                gutterBottom
                component="div"
              >
                {getTotalProductCount(products)}
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.card}>
            <PaidIcon />

            <Box sx={{ marginLeft: '30px' }}>
              <Typography
                variant="h5"
                sx={styles.cardLabel}
                gutterBottom
                component="div"
              >
                RETAIL VALUE
              </Typography>

              <Typography
                variant="h5"
                sx={styles.cardValue}
                gutterBottom
                component="div"
              >
                {renderPriceWithCommas(totalPrice)}
              </Typography>
            </Box>
          </Box>

          {/* <Box sx={{ ...styles.card, borderRight: 'unset' }}>
            <ShoppingCartIcon />

            <Box sx={{ marginLeft: '30px' }}>
              <Typography
                variant="h5"
                sx={styles.cardLabel}
                gutterBottom
                component="div"
              >
                UNREALIZED PROFIT
              </Typography>

              <Typography
                variant="h5"
                sx={styles.cardValue}
                gutterBottom
                component="div"
              >
                {renderPriceWithCommas(totalPrice)}
              </Typography>
            </Box>
          </Box> */}
        </Item>

        <Item sx={{ padding: '20px' }}>
          {allProducts.length > 0 ? (
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product</StyledTableCell>
                    <StyledTableCell>Cost Price</StyledTableCell>
                    <StyledTableCell>Selling Price</StyledTableCell>
                    {/* <StyledTableCell>Color</StyledTableCell> */}
                    <StyledTableCell>Size</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Created</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allProducts.map((row) => (
                    <StyledTableRow
                      key={row.name}
                      onClick={() =>
                        navigate(`${ROUTES.PRODUCTS_SUMMARY}?id=${row.id}`)
                      }
                    >
                      <StyledTableCell component="th" scope="row">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={row.image} />
                          </ListItemAvatar>
                          <ListItemText primary={row.name} />
                        </ListItem>
                      </StyledTableCell>
                      <StyledTableCell>₦ {row.costprice}</StyledTableCell>
                      <StyledTableCell>₦ {row.sellingprice}</StyledTableCell>
                      {/* <StyledTableCell>{row.color}</StyledTableCell> */}
                      <StyledTableCell>{row.size}</StyledTableCell>
                      <StyledTableCell>{row.quantity}</StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row.createdAt).format('MMM D, YYYY HH:mm')}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <EmptyData />
          )}
        </Item>
      </Box>
    </Layout>
  )
}

export default Products
